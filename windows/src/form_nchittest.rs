use bindings::Windows::Win32::{
    Foundation::{HWND, LPARAM, POINT},
    UI::WindowsAndMessaging,
};
use windows::*;

use crate::form;

const OFFSET: i32 = 8;

pub fn nc_hittest(h_wnd: HWND, l_param: LPARAM) -> Result<u32> {
    let POINT { x, y } = form::point_screen_to_client(h_wnd, form::point_from_lparam(l_param));
    let offset = form::dip_to_px(h_wnd, OFFSET);
    let window_rect = form::get_client_rect(h_wnd)?;
    let width = window_rect.right - window_rect.left;
    let height = window_rect.bottom - window_rect.top;
    if y <= offset {
        if x <= offset {
            return Ok(WindowsAndMessaging::HTTOPLEFT);
        }
        if x >= width - offset {
            return Ok(WindowsAndMessaging::HTTOPRIGHT);
        }
    }
    if y >= height - offset {
        if x <= offset {
            return Ok(WindowsAndMessaging::HTBOTTOMLEFT);
        }
        if x >= width - offset {
            return Ok(WindowsAndMessaging::HTBOTTOMRIGHT);
        }
    }
    if y <= offset {
        return Ok(WindowsAndMessaging::HTTOP);
    }
    if y >= height - offset {
        return Ok(WindowsAndMessaging::HTBOTTOM);
    }
    if x <= offset {
        return Ok(WindowsAndMessaging::HTLEFT);
    }
    if x >= width - offset {
        return Ok(WindowsAndMessaging::HTRIGHT);
    }
    Ok(WindowsAndMessaging::HTNOWHERE)
}
