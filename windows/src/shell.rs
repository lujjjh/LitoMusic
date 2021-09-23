use std::sync::atomic::{AtomicBool, Ordering};

use bindings::Windows::Win32::{
    Foundation::HWND,
    UI::{Shell, WindowsAndMessaging},
};

pub struct NotificationIcon {
    h_wnd: HWND,
    callback_message: Option<u32>,
    visible: AtomicBool,
}

impl NotificationIcon {
    pub fn new(h_wnd: HWND, callback_message: Option<u32>) -> Self {
        Self {
            h_wnd,
            callback_message,
            visible: AtomicBool::new(false),
        }
    }

    pub fn show(&self, visible: bool) {
        match self
            .visible
            .compare_exchange(!visible, visible, Ordering::SeqCst, Ordering::SeqCst)
        {
            Ok(_) => {
                let h_wnd = self.h_wnd;
                let mut tip: [u16; 128] = unsafe { std::mem::zeroed() };
                if visible {
                    let tip_vec = "Lito Music".encode_utf16().collect::<Vec<u16>>();
                    tip[..tip_vec.len()].copy_from_slice(&tip_vec);
                    let mut nid = Shell::NOTIFYICONDATAW {
                        cbSize: std::mem::size_of::<Shell::NOTIFYICONDATAW>() as u32,
                        hWnd: h_wnd,
                        uFlags: Shell::NIF_ICON | Shell::NIF_TIP,
                        hIcon: unsafe {
                            std::mem::transmute(WindowsAndMessaging::GetClassLongPtrW(
                                h_wnd,
                                WindowsAndMessaging::GCL_HICON,
                            ))
                        },
                        szTip: tip,
                        dwStateMask: Shell::NIS_SHAREDICON,
                        Anonymous: unsafe { std::mem::transmute(Shell::NOTIFYICON_VERSION_4) },
                        ..Default::default()
                    };
                    if let Some(callback_message) = self.callback_message {
                        nid.uCallbackMessage = callback_message;
                        nid.uFlags |= Shell::NIF_MESSAGE;
                    }
                    unsafe {
                        Shell::Shell_NotifyIconW(Shell::NIM_ADD, &nid);
                    }
                } else {
                    let nid = Shell::NOTIFYICONDATAW {
                        cbSize: std::mem::size_of::<Shell::NOTIFYICONDATAW>() as u32,
                        hWnd: h_wnd,
                        ..Default::default()
                    };
                    unsafe {
                        Shell::Shell_NotifyIconW(Shell::NIM_DELETE, &nid);
                    }
                };
            }
            Err(_) => {}
        }
    }
}

impl Drop for NotificationIcon {
    fn drop(&mut self) {
        self.show(false);
    }
}
