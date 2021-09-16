use std::ptr;

use bindings::{
    Microsoft::Web::WebView2::Win32::{
        ICoreWebView2, ICoreWebView2NavigationCompletedEventArgs,
        ICoreWebView2WebResourceRequestedEventHandler, COREWEBVIEW2_WEB_RESOURCE_CONTEXT_ALL,
    },
    Windows::Win32::{
        Foundation::{BOOL, E_POINTER, HWND, LPARAM, LRESULT, RECT, WPARAM},
        Graphics::{
            Direct3D11, DirectComposition, Dwm, Dxgi,
            Gdi::{self, HBRUSH},
        },
        System::{Com, LibraryLoader},
        UI::{Controls, WindowsAndMessaging},
    },
};
use windows::*;

use crate::{
    callback,
    form::{center_window, dp_to_px},
    form_nchittest, pwstr,
    web_resource_handler::WebResourceHandler,
    webview, APP_URL,
};

const CLASS_NAME: &str = "LitoMainForm";

const WM_WEBVIEW_CREATE: u32 = WindowsAndMessaging::WM_USER;

pub struct MainForm {
    h_wnd: HWND,
    _target: DirectComposition::IDCompositionTarget,
    webview: webview::WebView,
}

fn register_class() -> Result<()> {
    let h_instance = unsafe { LibraryLoader::GetModuleHandleW(None) };
    let window_class = WindowsAndMessaging::WNDCLASSW {
        style: WindowsAndMessaging::CS_HREDRAW | WindowsAndMessaging::CS_VREDRAW,
        lpfnWndProc: Some(wndproc),
        hInstance: h_instance,
        hIcon: unsafe {
            WindowsAndMessaging::LoadIconW(h_instance, WindowsAndMessaging::IDI_APPLICATION)
        },
        hCursor: unsafe { WindowsAndMessaging::LoadCursorW(None, WindowsAndMessaging::IDC_ARROW) },
        hbrBackground: HBRUSH(unsafe { Gdi::GetStockObject(Gdi::BLACK_BRUSH) }.0),
        lpszClassName: pwstr::pwstr_from_str(CLASS_NAME),
        ..Default::default()
    };
    if unsafe { WindowsAndMessaging::RegisterClassW(&window_class) } != 0 {
        Ok(())
    } else {
        Err(HRESULT::from_thread().into())
    }
}

impl MainForm {
    pub fn init() -> Result<()> {
        unsafe { Com::CoInitializeEx(std::ptr::null_mut(), Com::COINIT_APARTMENTTHREADED)? };
        register_class()?;
        Ok(())
    }

    pub fn create() -> Result<MainForm> {
        let h_instance = unsafe { LibraryLoader::GetModuleHandleW(None) };
        let h_wnd = unsafe {
            WindowsAndMessaging::CreateWindowExW(
                Default::default(),
                pwstr::pwstr_from_str(CLASS_NAME),
                pwstr::pwstr_from_str("Lito"),
                WindowsAndMessaging::WS_OVERLAPPEDWINDOW,
                0,
                0,
                0,
                0,
                None,
                None,
                h_instance,
                ptr::null_mut(),
            )
        };
        if h_wnd.is_null() {
            return Err(HRESULT::from_thread().into());
        }
        unsafe {
            WindowsAndMessaging::SetWindowPos(
                h_wnd,
                None,
                0,
                0,
                dp_to_px(h_wnd, 1024),
                dp_to_px(h_wnd, 768),
                WindowsAndMessaging::SWP_NOMOVE,
            );
        }
        center_window(h_wnd)?;
        unsafe {
            let margins = Controls::MARGINS {
                cxLeftWidth: -1,
                cxRightWidth: -1,
                cyTopHeight: -1,
                cyBottomHeight: -1,
            };
            Dwm::DwmExtendFrameIntoClientArea(h_wnd, &margins)?;

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
            let dcomp_device: DirectComposition::IDCompositionDevice =
                DirectComposition::DCompositionCreateDevice(&dxgi_device)?;
            let _target = dcomp_device.CreateTargetForHwnd(h_wnd, true)?;
            let root_visual = dcomp_device.CreateVisual()?;
            _target.SetRoot(&root_visual)?;
            let webview_visual = dcomp_device.CreateVisual()?;
            root_visual.AddVisual(&webview_visual, true, None)?;
            let mut webview = webview::WebView::new(
                h_wnd,
                dcomp_device.clone(),
                std::mem::transmute(webview_visual),
            );
            webview.create(move || {
                WindowsAndMessaging::PostMessageW(
                    h_wnd,
                    WM_WEBVIEW_CREATE,
                    WPARAM::default(),
                    LPARAM::default(),
                );
            })?;

            Ok(Self {
                h_wnd,
                _target,
                webview,
            })
        }
    }

    pub fn show(&self, visible: bool) {
        unsafe {
            WindowsAndMessaging::SetWindowLongPtrW(
                self.h_wnd,
                WindowsAndMessaging::GWL_USERDATA,
                self as *const _ as isize,
            );
            WindowsAndMessaging::ShowWindow(
                self.h_wnd,
                if visible {
                    WindowsAndMessaging::SW_SHOW
                } else {
                    WindowsAndMessaging::SW_HIDE
                },
            );
        }
    }
}

unsafe extern "system" fn wndproc(
    h_wnd: HWND,
    msg: u32,
    w_param: WPARAM,
    l_param: LPARAM,
) -> LRESULT {
    {
        let mut result = Default::default();
        let dwm_has_processed = Dwm::DwmDefWindowProc(h_wnd, msg, w_param, l_param, &mut result);
        if dwm_has_processed.as_bool() {
            return result;
        }
    }

    match msg {
        WindowsAndMessaging::WM_CREATE => {
            WindowsAndMessaging::SetWindowPos(
                h_wnd,
                None,
                0,
                0,
                0,
                0,
                WindowsAndMessaging::SWP_NOMOVE
                    | WindowsAndMessaging::SWP_NOSIZE
                    | WindowsAndMessaging::SWP_FRAMECHANGED,
            );
            return LRESULT(0);
        }
        WindowsAndMessaging::WM_NCCALCSIZE if w_param.0 != 0 => {
            let nccalcsize_params =
                &mut *(l_param.0 as *mut WindowsAndMessaging::NCCALCSIZE_PARAMS);
            let cx_frame = WindowsAndMessaging::GetSystemMetrics(WindowsAndMessaging::SM_CXFRAME);
            let cy_frame = WindowsAndMessaging::GetSystemMetrics(WindowsAndMessaging::SM_CYFRAME);
            let cx_padded_border =
                WindowsAndMessaging::GetSystemMetrics(WindowsAndMessaging::SM_CXPADDEDBORDER);
            nccalcsize_params.rgrc[0].right -= cx_frame + cx_padded_border;
            nccalcsize_params.rgrc[0].left += cx_frame + cx_padded_border;
            nccalcsize_params.rgrc[0].bottom -= cy_frame + cx_padded_border;
            return LRESULT(0);
        }
        WindowsAndMessaging::WM_NCHITTEST => {
            let result = form_nchittest::nc_hittest(h_wnd, l_param).unwrap();
            if result != WindowsAndMessaging::HTNOWHERE {
                return LRESULT(result as i32);
            } else {
                return LRESULT(WindowsAndMessaging::HTCLIENT as i32);
            }
        }
        WindowsAndMessaging::WM_DESTROY => {
            WindowsAndMessaging::PostQuitMessage(0);
            return LRESULT(0);
        }
        _ => {}
    };

    let main_form = {
        let ptr = WindowsAndMessaging::GetWindowLongPtrW(h_wnd, WindowsAndMessaging::GWL_USERDATA)
            as *const MainForm;
        if ptr.is_null() {
            return WindowsAndMessaging::DefWindowProcW(h_wnd, msg, w_param, l_param);
        }
        &*ptr
    };

    main_form
        .webview
        .forward_mouse_messages(h_wnd, msg, w_param, l_param);

    match msg {
        WM_WEBVIEW_CREATE => {
            let mut rect = Default::default();
            WindowsAndMessaging::GetClientRect(h_wnd, &mut rect);
            let width = rect.right - rect.left;
            let height = rect.bottom - rect.top;
            let l_param = LPARAM(((width & 0xffff) | ((height & 0xffff) << 16)) as isize);
            WindowsAndMessaging::PostMessageW(
                h_wnd,
                WindowsAndMessaging::WM_SIZE,
                WPARAM(WindowsAndMessaging::SIZE_RESTORED as usize),
                l_param,
            );
            if let Some(controller) = main_form.webview.get_controller() {
                let webview2 = controller.get_CoreWebView2().unwrap();
                webview2
                    .AddWebResourceRequestedFilter(
                        APP_URL.to_string() + "*",
                        COREWEBVIEW2_WEB_RESOURCE_CONTEXT_ALL,
                    )
                    .unwrap();
                let mut _token = Default::default();
                webview2
                    .add_WebResourceRequested(
                        ICoreWebView2WebResourceRequestedEventHandler::from(
                            WebResourceHandler::new(),
                        ),
                        &mut _token,
                    )
                    .unwrap();
                webview2
                    .Navigate(APP_URL.to_string() + "index.html")
                    .unwrap();
                let mut token = Default::default();
                let navigation_completed_handler = Box::new(
                    move |webview2: Option<ICoreWebView2>,
                          _args: Option<ICoreWebView2NavigationCompletedEventArgs>|
                          -> Result<()> {
                        unsafe {
                            let webview2 = webview2.ok_or_else(|| Error::fast_error(E_POINTER))?;
                            webview2.remove_NavigationCompleted(token)?;
                            controller.put_IsVisible(true)?;
                            main_form.show(true);
                            Ok(())
                        }
                    },
                );
                webview2
                    .add_NavigationCompleted(
                        callback::NavigationCompletedEventHandler::create(
                            navigation_completed_handler,
                        ),
                        &mut token,
                    )
                    .unwrap();
            } else {
                main_form.show(true);
            }
            LRESULT(0)
        }
        WindowsAndMessaging::WM_SIZE => {
            let width = (l_param.0 & 0xffff) as i32;
            let height = ((l_param.0 >> 16) & 0xffff) as i32;
            if let Some(controller) = main_form.webview.get_controller() {
                controller
                    .put_Bounds(RECT {
                        right: width,
                        bottom: height,
                        ..Default::default()
                    })
                    .unwrap();
            }
            LRESULT(0)
        }
        _ => WindowsAndMessaging::DefWindowProcW(h_wnd, msg, w_param, l_param),
    }
}

pub fn dispatch_message_loop() -> Result<()> {
    unsafe {
        let mut msg = WindowsAndMessaging::MSG::default();
        loop {
            match WindowsAndMessaging::GetMessageW(&mut msg, None, 0, 0) {
                BOOL(-1) => break Err(HRESULT::from_thread().into()),
                BOOL(0) => break Ok(()),
                _ => {
                    WindowsAndMessaging::TranslateMessage(&msg);
                    WindowsAndMessaging::DispatchMessageW(&msg);
                }
            }
        }
    }
}
