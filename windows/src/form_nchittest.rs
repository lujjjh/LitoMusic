use bindings::Windows::Win32::{
    Foundation::{HWND, LPARAM},
    UI::WindowsAndMessaging,
};
use windows::*;

use crate::form::{self, get_window_scale};

const OFFSET: i32 = 8;

pub fn nc_hittest(h_wnd: HWND, l_param: LPARAM) -> Result<u32> {
    let x = (l_param.0 & 0xFFFF) as i32;
    let y = ((l_param.0 >> 16) & 0xFFFF) as i32;

    let scale = get_window_scale(h_wnd);
    let offset = (OFFSET as f32 * scale).round() as i32;

    let window_rect = form::get_window_rect(h_wnd)?;
    if y <= window_rect.top + offset {
        if x <= window_rect.left + offset {
            return Ok(WindowsAndMessaging::HTTOPLEFT);
        }
        if x >= window_rect.right - offset {
            return Ok(WindowsAndMessaging::HTTOPRIGHT);
        }
    }
    if y >= window_rect.bottom - offset {
        if x <= window_rect.left + offset {
            return Ok(WindowsAndMessaging::HTBOTTOMLEFT);
        }
        if x >= window_rect.right - offset {
            return Ok(WindowsAndMessaging::HTBOTTOMRIGHT);
        }
    }
    if y <= window_rect.top + offset {
        return Ok(WindowsAndMessaging::HTTOP);
    }
    if y >= window_rect.bottom - offset {
        return Ok(WindowsAndMessaging::HTBOTTOM);
    }
    if x <= window_rect.left + offset {
        return Ok(WindowsAndMessaging::HTLEFT);
    }
    if x >= window_rect.right - offset {
        return Ok(WindowsAndMessaging::HTRIGHT);
    }
    Ok(WindowsAndMessaging::HTNOWHERE)
}
