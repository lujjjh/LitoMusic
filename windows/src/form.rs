use bindings::Windows::Win32::{
    Foundation::{BOOL, HWND, LPARAM, POINT, RECT},
    Graphics::{Dwm, Gdi},
    System::LibraryLoader,
    UI::{Controls, HiDpi::GetDpiForWindow, WindowsAndMessaging},
};
use windows::*;

pub fn get_work_area_rect() -> Result<RECT> {
    let mut work_area_rect = RECT::default();
    if unsafe {
        WindowsAndMessaging::SystemParametersInfoW(
            WindowsAndMessaging::SPI_GETWORKAREA,
            0,
            work_area_rect.set_abi() as _,
            Default::default(),
        )
    }
    .as_bool()
    {
        Ok(work_area_rect)
    } else {
        Err(HRESULT::from_thread().into())
    }
}

pub fn get_window_rect(h_wnd: HWND) -> Result<RECT> {
    let mut rect = Default::default();
    if unsafe { WindowsAndMessaging::GetWindowRect(h_wnd, &mut rect) }.as_bool() {
        Ok(rect)
    } else {
        Err(HRESULT::from_thread().into())
    }
}

pub fn get_client_rect(h_wnd: HWND) -> Result<RECT> {
    let mut rect = Default::default();
    if unsafe { WindowsAndMessaging::GetClientRect(h_wnd, &mut rect) }.as_bool() {
        Ok(rect)
    } else {
        Err(HRESULT::from_thread().into())
    }
}

pub fn center_window(h_wnd: HWND) -> Result<()> {
    let window_rect = get_window_rect(h_wnd)?;
    let window_width = window_rect.right - window_rect.left;
    let window_height = window_rect.bottom - window_rect.top;
    let work_area_rect = get_work_area_rect()?;
    let x = work_area_rect.left / 2 + work_area_rect.right / 2 - window_width / 2;
    let y = work_area_rect.top / 2 + work_area_rect.bottom / 2 - window_height / 2;
    unsafe {
        WindowsAndMessaging::SetWindowPos(h_wnd, None, x, y, 0, 0, WindowsAndMessaging::SWP_NOSIZE);
    }
    Ok(())
}

pub fn get_window_dpi(h_wnd: HWND) -> u32 {
    unsafe { GetDpiForWindow(h_wnd) }
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
