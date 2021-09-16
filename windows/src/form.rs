use bindings::Windows::Win32::{
    Foundation::{HWND, RECT},
    UI::{HiDpi::GetDpiForWindow, WindowsAndMessaging},
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

pub fn dp_to_px(h_wnd: HWND, px: i32) -> i32 {
    ((px as f32) * get_window_scale(h_wnd)).round() as i32
}
