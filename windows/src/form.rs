use std::ptr;

use bindings::Windows::Win32::{
    Foundation::{BOOL, HWND, LPARAM, LRESULT, POINT, PWSTR, RECT, WPARAM},
    Graphics::{Dwm, Gdi},
    System::LibraryLoader,
    UI::{Controls, HiDpi, WindowsAndMessaging},
};
use windows::*;

use crate::pwstr;

fn check_h_wnd(h_wnd: HWND) -> Result<HWND> {
    if h_wnd.is_invalid() {
        Err(Error::from_win32())
    } else {
        Ok(h_wnd)
    }
}

fn check_bool(value: BOOL) -> Result<()> {
    if value.as_bool() {
        Ok(())
    } else {
        Err(Error::from_win32())
    }
}

pub fn register_class(
    class_name: &str,
    wnd_proc: Option<unsafe extern "system" fn(HWND, u32, WPARAM, LPARAM) -> LRESULT>,
) -> Result<()> {
    let h_instance = unsafe { LibraryLoader::GetModuleHandleW(None) };
    let class_name = pwstr::null_terminated_u16_vec_from_str(class_name);
    let window_class = WindowsAndMessaging::WNDCLASSW {
        style: WindowsAndMessaging::CS_HREDRAW | WindowsAndMessaging::CS_VREDRAW,
        lpfnWndProc: wnd_proc,
        hInstance: h_instance,
        hIcon: unsafe {
            WindowsAndMessaging::LoadIconW(h_instance, WindowsAndMessaging::IDI_APPLICATION)
        },
        hCursor: unsafe { WindowsAndMessaging::LoadCursorW(None, WindowsAndMessaging::IDC_ARROW) },
        lpszClassName: PWSTR(class_name.as_ptr() as _),
        ..Default::default()
    };
    if unsafe { WindowsAndMessaging::RegisterClassW(&window_class) } != 0 {
        Ok(())
    } else {
        Err(Error::from_win32())
    }
}

pub fn create_window(
    parent: Option<HWND>,
    class_name: &str,
    window_name: &str,
    style: WindowsAndMessaging::WINDOW_STYLE,
    ex_style: WindowsAndMessaging::WINDOW_EX_STYLE,
    bounds: RECT,
) -> Result<HWND> {
    check_h_wnd(unsafe {
        WindowsAndMessaging::CreateWindowExW(
            ex_style,
            class_name,
            window_name,
            style,
            bounds.left,
            bounds.top,
            bounds.right - bounds.left,
            bounds.bottom - bounds.top,
            parent,
            None,
            LibraryLoader::GetModuleHandleW(None),
            ptr::null_mut(),
        )
    })
}

pub fn set_window_bounds(h_wnd: HWND, bounds: RECT) -> Result<()> {
    check_bool(unsafe {
        WindowsAndMessaging::SetWindowPos(
            h_wnd,
            None,
            bounds.left,
            bounds.top,
            bounds.right - bounds.left,
            bounds.bottom - bounds.top,
            Default::default(),
        )
    })
}

pub fn dispatch_message_loop() -> Result<()> {
    unsafe {
        let mut msg = WindowsAndMessaging::MSG::default();
        loop {
            match WindowsAndMessaging::GetMessageW(&mut msg, None, 0, 0) {
                BOOL(-1) => break Err(Error::from_win32()),
                BOOL(0) => break Ok(()),
                _ => {
                    WindowsAndMessaging::TranslateMessage(&msg);
                    WindowsAndMessaging::DispatchMessageW(&msg);
                }
            }
        }
    }
}

pub fn get_work_area_rect() -> Result<RECT> {
    let mut work_area_rect = RECT::default();
    if unsafe {
        WindowsAndMessaging::SystemParametersInfoW(
            WindowsAndMessaging::SPI_GETWORKAREA,
            0,
            std::mem::transmute(&mut work_area_rect),
            Default::default(),
        )
    }
    .as_bool()
    {
        Ok(work_area_rect)
    } else {
        Err(Error::from_win32())
    }
}

pub fn get_window_rect(h_wnd: HWND) -> Result<RECT> {
    let mut rect = Default::default();
    if unsafe { WindowsAndMessaging::GetWindowRect(h_wnd, &mut rect) }.as_bool() {
        Ok(rect)
    } else {
        Err(Error::from_win32())
    }
}

pub fn get_client_rect(h_wnd: HWND) -> Result<RECT> {
    let mut rect = Default::default();
    if unsafe { WindowsAndMessaging::GetClientRect(h_wnd, &mut rect) }.as_bool() {
        Ok(rect)
    } else {
        Err(Error::from_win32())
    }
}

pub fn center_window_in_rect(h_wnd: HWND, rect: RECT) -> Result<()> {
    let window_rect = get_window_rect(h_wnd)?;
    let window_width = window_rect.right - window_rect.left;
    let window_height = window_rect.bottom - window_rect.top;
    let x = rect.left / 2 + rect.right / 2 - window_width / 2;
    let y = rect.top / 2 + rect.bottom / 2 - window_height / 2;
    unsafe {
        WindowsAndMessaging::SetWindowPos(h_wnd, None, x, y, 0, 0, WindowsAndMessaging::SWP_NOSIZE);
    }
    Ok(())
}

pub fn center_window(h_wnd: HWND) -> Result<()> {
    center_window_in_rect(h_wnd, get_work_area_rect()?)
}

pub fn get_window_dpi(h_wnd: HWND) -> u32 {
    // I'm not using GetDpiForWindow because Win 8 does not support it.
    unsafe {
        let monitor = Gdi::MonitorFromWindow(h_wnd, Gdi::MONITOR_DEFAULTTONEAREST);
        if monitor.is_invalid() {
            96
        } else {
            let (mut dpi_x, mut _dpi_y) = (0, 0);
            match HiDpi::GetDpiForMonitor(
                monitor,
                HiDpi::MDT_EFFECTIVE_DPI,
                &mut dpi_x,
                &mut _dpi_y,
            ) {
                Ok(()) => dpi_x,
                Err(_) => 96,
            }
        }
    }
}

pub fn get_window_scale(h_wnd: HWND) -> f32 {
    get_window_dpi(h_wnd) as f32 / 96.
}

pub fn dip_to_px(h_wnd: HWND, dip: i32) -> i32 {
    ((dip as f32) * get_window_scale(h_wnd)).round() as i32
}

pub fn point_from_lparam(l_param: LPARAM) -> POINT {
    let x = (l_param.0 & 0xFFFF) as i32;
    let y = ((l_param.0 >> 16) & 0xFFFF) as i32;
    POINT { x, y }
}

pub fn point_screen_to_client(h_wnd: HWND, point: POINT) -> POINT {
    let mut point = point;
    unsafe {
        Gdi::ScreenToClient(h_wnd, &mut point);
    }
    point
}

pub fn enable_blur_behind(h_wnd: HWND) -> Result<()> {
    unsafe {
        let h_module = LibraryLoader::LoadLibraryW("user32.dll");

        #[allow(unused)]
        #[repr(C)]
        enum AccentState {
            AccentDisabled = 0,
            AccentEnableGradient = 1,
            AccentEnableTransparentgradient = 2,
            AccentEnableBlurbehind = 3,
            AccentEnableAcrylicblurbehind = 4,
            AccentEnableHostbackdrop = 5, // RS5 1809
            AccentInvalidState = 6,
        }

        #[repr(C)]
        struct AccentPolicy {
            accent_state: AccentState,
            accent_flags: i32,
            gradient_color: i32,
            animation_id: i32,
        }

        #[repr(C)]
        enum WindowCompositionAttribute {
            WcaAccentPolicy = 19,
        }

        #[repr(C)]
        pub struct WindowCompositionAttributeData {
            attribute: WindowCompositionAttribute,
            p_data: *const std::ffi::c_void,
            data_size: usize,
        }

        type SetWindowCompositionAttribute =
            unsafe extern "system" fn(HWND, *mut WindowCompositionAttributeData) -> BOOL;

        let set_window_composition_attribute: Option<SetWindowCompositionAttribute> =
            std::mem::transmute(LibraryLoader::GetProcAddress(
                h_module,
                "SetWindowCompositionAttribute",
            ));
        LibraryLoader::FreeLibrary(h_module);

        if let Some(set_window_composition_attribute) = set_window_composition_attribute {
            let policy = AccentPolicy {
                accent_state: AccentState::AccentEnableBlurbehind,
                accent_flags: 2,
                gradient_color: 0,
                animation_id: 0,
            };
            let mut data = WindowCompositionAttributeData {
                attribute: WindowCompositionAttribute::WcaAccentPolicy,
                p_data: std::mem::transmute(&policy),
                data_size: std::mem::size_of::<AccentPolicy>(),
            };
            set_window_composition_attribute(h_wnd, &mut data);
        }

        let blur_behind = Dwm::DWM_BLURBEHIND {
            dwFlags: Dwm::DWM_BB_ENABLE,
            fEnable: BOOL(1),
            hRgnBlur: Gdi::HRGN::default(),
            fTransitionOnMaximized: BOOL(0),
        };
        Dwm::DwmEnableBlurBehindWindow(h_wnd, &blur_behind)?;

        Dwm::DwmExtendFrameIntoClientArea(
            h_wnd,
            &Controls::MARGINS {
                cxLeftWidth: 0,
                cyTopHeight: 0,
                cxRightWidth: 0,
                cyBottomHeight: 0,
            },
        )?;
    }

    Ok(())
}
