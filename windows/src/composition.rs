use std::{ptr, sync::atomic};

use bindings::Windows::Win32::{
    Foundation::{HWND, LPARAM, POINT, WPARAM},
    Graphics::{Direct2D, Direct3D11, DirectComposition, Dxgi},
    UI::WindowsAndMessaging,
};
use windows::*;

use crate::{form, form_nchittest, DEBUG};

const CONTROL_BUTTON_WIDTH: f32 = 44.;
const CONTROL_BUTTON_HEIGHT: f32 = 28.;
const CONTROL_SYMBOL_SIZE: f32 = 10.;

pub struct WebViewFormComposition {
    h_wnd: HWND,
    is_maximized: atomic::AtomicBool,
    d2d_factory: Direct2D::ID2D1Factory2,
    dc: Direct2D::ID2D1DeviceContext,
    dcomp_device: DirectComposition::IDCompositionDevice,
    _target: DirectComposition::IDCompositionTarget,
    background_visual: DirectComposition::IDCompositionVisual,
    webview_visual: DirectComposition::IDCompositionVisual,
    caption_button_visual: DirectComposition::IDCompositionVisual,
}

impl WebViewFormComposition {
    pub fn new(h_wnd: HWND) -> Result<Self> {
        unsafe {
            let mut direct3d_device = None;
            Direct3D11::D3D11CreateDevice(
                None,
                Direct3D11::D3D_DRIVER_TYPE_HARDWARE,
                None,
                Direct3D11::D3D11_CREATE_DEVICE_BGRA_SUPPORT,
                ptr::null(),
                0,
                Direct3D11::D3D11_SDK_VERSION,
                &mut direct3d_device,
                ptr::null_mut(),
                ptr::null_mut(),
            )?;
            let direct3d_device = direct3d_device.unwrap();
            let dxgi_device = direct3d_device.cast::<Dxgi::IDXGIDevice>()?;
            let mut d2d_factory: Option<Direct2D::ID2D1Factory2> = None;
            Direct2D::D2D1CreateFactory(
                Direct2D::D2D1_FACTORY_TYPE_SINGLE_THREADED,
                &Direct2D::ID2D1Factory::IID,
                &Direct2D::D2D1_FACTORY_OPTIONS {
                    debugLevel: if DEBUG {
                        Direct2D::D2D1_DEBUG_LEVEL_INFORMATION
                    } else {
                        Direct2D::D2D1_DEBUG_LEVEL(0)
                    },
                },
                std::mem::transmute(&mut d2d_factory),
            )?;
            let d2d_factory = d2d_factory.unwrap();
            let d2d_device = d2d_factory.CreateDevice(&dxgi_device)?;
            let dc = d2d_device.CreateDeviceContext(Direct2D::D2D1_DEVICE_CONTEXT_OPTIONS_NONE)?;
            let mut dpi_x = 0.;
            let mut dpi_y = 0.;
            d2d_factory.GetDesktopDpi(&mut dpi_x, &mut dpi_y);
            dc.SetDpi(dpi_x, dpi_y);

            let mut dcomp_device: Option<DirectComposition::IDCompositionDevice> = None;
            DirectComposition::DCompositionCreateDevice(
                &dxgi_device,
                &DirectComposition::IDCompositionDevice::IID,
                std::mem::transmute(&mut dcomp_device),
            )?;
            let dcomp_device = dcomp_device.unwrap();
            let _target = dcomp_device.CreateTargetForHwnd(h_wnd, true)?;
            let root_visual = dcomp_device.CreateVisual()?;
            _target.SetRoot(&root_visual)?;

            let background_visual = dcomp_device.CreateVisual()?;
            root_visual.AddVisual(&background_visual, true, None)?;

            let webview_visual = dcomp_device.CreateVisual()?;
            root_visual.AddVisual(&webview_visual, true, &background_visual)?;

            let caption_button_visual = dcomp_device.CreateVisual()?;
            root_visual.AddVisual(&caption_button_visual, true, &webview_visual)?;

            Ok(Self {
                h_wnd,
                is_maximized: atomic::AtomicBool::new(false),
                d2d_factory,
                dc,
                dcomp_device,
                _target,
                background_visual,
                webview_visual,
                caption_button_visual,
            })
        }
    }

    pub fn get_dcomp_device(&self) -> &DirectComposition::IDCompositionDevice {
        &self.dcomp_device
    }

    pub fn get_webview_visual(&self) -> &DirectComposition::IDCompositionVisual {
        &self.webview_visual
    }

    pub fn commit(&self) -> Result<()> {
        unsafe { self.dcomp_device.Commit() }
    }

    pub fn update(&self, w_param: WPARAM) -> Result<()> {
        self.is_maximized.store(
            w_param.0 == WindowsAndMessaging::SIZE_MAXIMIZED as usize,
            atomic::Ordering::SeqCst,
        );
        self.update_background()?;
        self.update_caption_button()?;
        Ok(())
    }

    fn get_dpi(&self) -> (f32, f32) {
        let (mut dpi_x, mut dpi_y) = (0., 0.);
        unsafe {
            self.d2d_factory.GetDesktopDpi(&mut dpi_x, &mut dpi_y);
        }
        (dpi_x, dpi_y)
    }

    fn get_scale(&self) -> (f32, f32) {
        let (dpi_x, dpi_y) = self.get_dpi();
        (dpi_x / 96., dpi_y / 96.)
    }

    fn update_background(&self) -> Result<()> {
        unsafe {
            let dc = &self.dc;
            let bounds = form::get_client_rect(self.h_wnd)?;
            let width_px = bounds.right - bounds.left;
            let height_px = bounds.bottom - bounds.top;
            // TODO: Reuse resources if the size is not changed.
            let surface = self.dcomp_device.CreateSurface(
                width_px as u32,
                height_px as u32,
                Dxgi::DXGI_FORMAT_B8G8R8A8_UNORM,
                Dxgi::DXGI_ALPHA_MODE_PREMULTIPLIED,
            )?;
            let mut dxgi_surface: Option<Dxgi::IDXGISurface1> = None;
            let mut offset = Default::default();
            surface.BeginDraw(
                ptr::null(),
                &Dxgi::IDXGISurface1::IID,
                std::mem::transmute(&mut dxgi_surface),
                &mut offset,
            )?;
            let dxgi_surface = dxgi_surface.unwrap();
            let (dpi_x, dpi_y) = self.get_dpi();
            let bitmap = dc.CreateBitmapFromDxgiSurface(
                &dxgi_surface,
                &Direct2D::D2D1_BITMAP_PROPERTIES1 {
                    pixelFormat: Direct2D::D2D1_PIXEL_FORMAT {
                        format: Dxgi::DXGI_FORMAT_B8G8R8A8_UNORM,
                        alphaMode: Direct2D::D2D1_ALPHA_MODE_PREMULTIPLIED,
                    },
                    dpiX: dpi_x,
                    dpiY: dpi_y,
                    bitmapOptions: Direct2D::D2D1_BITMAP_OPTIONS_TARGET
                        | Direct2D::D2D1_BITMAP_OPTIONS_CANNOT_DRAW,
                    colorContext: None,
                },
            )?;
            dc.SetTarget(&bitmap);
            dc.BeginDraw();
            dc.Clear(&Direct2D::D2D1_COLOR_F {
                r: 1.,
                g: 1.,
                b: 1.,
                a: 1.,
            });
            dc.EndDraw(ptr::null_mut(), ptr::null_mut())?;
            surface.EndDraw()?;
            self.background_visual.SetContent(&surface)?;
            Ok(())
        }
    }

    fn get_caption_button_bounds(&self) -> Result<Direct2D::D2D_RECT_F> {
        let (scale_x, scale_y) = self.get_scale();
        let client_bounds = form::get_client_rect(self.h_wnd)?;
        let is_maximized = self.is_maximized.load(atomic::Ordering::SeqCst);
        let right = (client_bounds.right - client_bounds.left) as f32 / scale_x
            - if is_maximized { 0. } else { 1. };
        let top = if is_maximized {
            unsafe {
                let cy_frame =
                    WindowsAndMessaging::GetSystemMetrics(WindowsAndMessaging::SM_CYFRAME) as f32
                        / scale_y;
                let cx_padded_border =
                    WindowsAndMessaging::GetSystemMetrics(WindowsAndMessaging::SM_CXPADDEDBORDER)
                        as f32
                        / scale_y;
                cy_frame + cx_padded_border
            }
        } else {
            1.
        };
        let bottom = top + CONTROL_BUTTON_HEIGHT;
        let left = right - CONTROL_BUTTON_WIDTH * 3.;
        Ok(Direct2D::D2D_RECT_F {
            left,
            top,
            right,
            bottom,
        })
    }

    fn get_minimize_button_bounds(&self) -> Result<Direct2D::D2D_RECT_F> {
        let Direct2D::D2D_RECT_F {
            left, top, bottom, ..
        } = self.get_caption_button_bounds()?;
        Ok(Direct2D::D2D_RECT_F {
            left,
            top,
            right: left + CONTROL_BUTTON_WIDTH,
            bottom,
        })
    }

    fn get_maximize_button_bounds(&self) -> Result<Direct2D::D2D_RECT_F> {
        let Direct2D::D2D_RECT_F {
            left, top, bottom, ..
        } = self.get_caption_button_bounds()?;
        Ok(Direct2D::D2D_RECT_F {
            left: left + CONTROL_BUTTON_WIDTH,
            top,
            right: left + CONTROL_BUTTON_WIDTH * 2.,
            bottom,
        })
    }

    fn get_close_button_bounds(&self) -> Result<Direct2D::D2D_RECT_F> {
        let Direct2D::D2D_RECT_F {
            left, top, bottom, ..
        } = self.get_caption_button_bounds()?;
        Ok(Direct2D::D2D_RECT_F {
            left: left + CONTROL_BUTTON_WIDTH * 2.,
            top,
            right: left + CONTROL_BUTTON_WIDTH * 3.,
            bottom,
        })
    }

    pub fn nc_hittest(&self, l_param: LPARAM) -> Result<u32> {
        let POINT { x, y } =
            form::point_screen_to_client(self.h_wnd, form::point_from_lparam(l_param));
        let (scale_x, scale_y) = self.get_scale();
        let x = x as f32 / scale_x;
        let y = y as f32 / scale_y;
        let pt_in_rect =
            |Direct2D::D2D_RECT_F {
                 left,
                 top,
                 right,
                 bottom,
             }| { (left <= x && x <= right) && (top <= y && y <= bottom) };
        if pt_in_rect(self.get_minimize_button_bounds()?) {
            Ok(WindowsAndMessaging::HTMINBUTTON)
        } else if pt_in_rect(self.get_maximize_button_bounds()?) {
            Ok(WindowsAndMessaging::HTMAXBUTTON)
        } else if pt_in_rect(self.get_close_button_bounds()?) {
            Ok(WindowsAndMessaging::HTCLOSE)
        } else if !self.is_maximized.load(atomic::Ordering::SeqCst) {
            form_nchittest::nc_hittest(self.h_wnd, l_param)
        } else {
            Ok(WindowsAndMessaging::HTNOWHERE)
        }
    }

    fn update_caption_button(&self) -> Result<()> {
        unsafe {
            let dc = &self.dc;
            let bounds = self.get_caption_button_bounds()?;
            let (scale_x, scale_y) = self.get_scale();
            let width = bounds.right - bounds.left;
            let height = bounds.bottom - bounds.top;
            // TODO: Reuse resources if the size is not changed.
            let surface = self.dcomp_device.CreateSurface(
                (width * scale_x).round() as u32,
                (height * scale_y).round() as u32,
                Dxgi::DXGI_FORMAT_B8G8R8A8_UNORM,
                Dxgi::DXGI_ALPHA_MODE_PREMULTIPLIED,
            )?;
            let mut dxgi_surface: Option<Dxgi::IDXGISurface1> = None;
            let mut offset = Default::default();
            surface.BeginDraw(
                ptr::null(),
                &Dxgi::IDXGISurface1::IID,
                std::mem::transmute(&mut dxgi_surface),
                &mut offset,
            )?;
            let dxgi_surface = dxgi_surface.unwrap();
            let offset_x = offset.x as f32 / scale_x;
            let offset_y = offset.y as f32 / scale_y;
            let (dpi_x, dpi_y) = self.get_dpi();
            let bitmap = dc.CreateBitmapFromDxgiSurface(
                &dxgi_surface,
                &Direct2D::D2D1_BITMAP_PROPERTIES1 {
                    pixelFormat: Direct2D::D2D1_PIXEL_FORMAT {
                        format: Dxgi::DXGI_FORMAT_B8G8R8A8_UNORM,
                        alphaMode: Direct2D::D2D1_ALPHA_MODE_PREMULTIPLIED,
                    },
                    dpiX: dpi_x,
                    dpiY: dpi_y,
                    bitmapOptions: Direct2D::D2D1_BITMAP_OPTIONS_TARGET
                        | Direct2D::D2D1_BITMAP_OPTIONS_CANNOT_DRAW,
                    colorContext: None,
                },
            )?;
            dc.SetTarget(&bitmap);
            dc.BeginDraw();
            dc.Clear(ptr::null());
            let symbol_brush = dc.CreateSolidColorBrush(
                &Direct2D::D2D1_COLOR_F {
                    a: 1.,
                    ..Default::default()
                },
                ptr::null(),
            )?;
            let padding_x = (CONTROL_BUTTON_WIDTH - CONTROL_SYMBOL_SIZE) / 2.;
            let padding_y = (CONTROL_BUTTON_HEIGHT - CONTROL_SYMBOL_SIZE) / 2.;
            // Min button.
            dc.DrawLine(
                Direct2D::D2D_POINT_2F {
                    x: offset_x + padding_x,
                    y: offset_y + CONTROL_BUTTON_HEIGHT / 2.,
                },
                Direct2D::D2D_POINT_2F {
                    x: offset_x + padding_x + CONTROL_SYMBOL_SIZE,
                    y: offset_y + CONTROL_BUTTON_HEIGHT / 2.,
                },
                &symbol_brush,
                1.,
                None,
            );
            let offset_x = offset_x + CONTROL_BUTTON_WIDTH;
            if self.is_maximized.load(atomic::Ordering::SeqCst) {
                // Restore button.
                dc.DrawRectangle(
                    &Direct2D::D2D_RECT_F {
                        left: offset_x + padding_x + 2.,
                        top: offset_y + padding_y,
                        right: offset_x + padding_x + CONTROL_SYMBOL_SIZE,
                        bottom: offset_y + padding_y + CONTROL_SYMBOL_SIZE - 2.,
                    },
                    &symbol_brush,
                    1.,
                    None,
                );
                dc.DrawRectangle(
                    &Direct2D::D2D_RECT_F {
                        left: offset_x + padding_x,
                        top: offset_y + padding_y + 2.,
                        right: offset_x + padding_x + CONTROL_SYMBOL_SIZE - 2.,
                        bottom: offset_y + padding_y + CONTROL_SYMBOL_SIZE,
                    },
                    &symbol_brush,
                    1.,
                    None,
                );
            } else {
                // Max button.
                dc.DrawRectangle(
                    &Direct2D::D2D_RECT_F {
                        left: offset_x + padding_x,
                        top: offset_y + padding_y,
                        right: offset_x + padding_x + CONTROL_SYMBOL_SIZE,
                        bottom: offset_y + padding_y + CONTROL_SYMBOL_SIZE,
                    },
                    &symbol_brush,
                    1.,
                    None,
                );
            }
            let offset_x = offset_x + CONTROL_BUTTON_WIDTH;
            // Close button.
            dc.DrawLine(
                Direct2D::D2D_POINT_2F {
                    x: offset_x + padding_x,
                    y: offset_y + padding_y,
                },
                Direct2D::D2D_POINT_2F {
                    x: offset_x + padding_x + CONTROL_SYMBOL_SIZE,
                    y: offset_y + padding_y + CONTROL_SYMBOL_SIZE,
                },
                &symbol_brush,
                1.,
                None,
            );
            dc.DrawLine(
                Direct2D::D2D_POINT_2F {
                    x: offset_x + padding_x,
                    y: offset_y + padding_y + CONTROL_SYMBOL_SIZE,
                },
                Direct2D::D2D_POINT_2F {
                    x: offset_x + padding_x + CONTROL_SYMBOL_SIZE,
                    y: offset_y + padding_y,
                },
                &symbol_brush,
                1.,
                None,
            );
            dc.EndDraw(ptr::null_mut(), ptr::null_mut())?;
            surface.EndDraw()?;
            self.caption_button_visual.SetContent(&surface)?;
            self.caption_button_visual
                .SetOffsetX2(bounds.left * scale_x)?;
            self.caption_button_visual
                .SetOffsetY2(bounds.top * scale_y)?;
            self.commit()?;
        }
        Ok(())
    }
}
