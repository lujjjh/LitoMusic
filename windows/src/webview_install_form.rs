use bindings::Windows::{
    self,
    Win32::{
        Foundation::{E_NOTIMPL, HWND, LPARAM, LRESULT, PWSTR, RECT, S_OK, WPARAM},
        System::Com,
        UI::{Controls, Shell, WindowsAndMessaging},
    },
};
use windows::*;

use crate::{form, pwstr};

const CLASS_NAME: &str = "WebViewInstallForm";

pub struct WebViewInstallForm {
    h_wnd: HWND,
    progress_bar_h_wnd: HWND,
}

pub fn init() -> Result<()> {
    form::register_class(CLASS_NAME, Some(wndproc))?;
    Ok(())
}

fn create_window() -> Result<HWND> {
    let h_wnd = form::create_window(
        None,
        CLASS_NAME,
        "Installing Edge WebView2 Runtime...",
        WindowsAndMessaging::WS_OVERLAPPED
            | WindowsAndMessaging::WS_CAPTION
            | WindowsAndMessaging::WS_SYSMENU
            | WindowsAndMessaging::WS_MINIMIZEBOX,
        Default::default(),
        Default::default(),
    )?;
    form::set_window_bounds(
        h_wnd,
        RECT {
            right: form::dip_to_px(h_wnd, 450),
            bottom: form::dip_to_px(h_wnd, 180),
            ..Default::default()
        },
    )?;
    form::center_window(h_wnd)?;
    Ok(h_wnd)
}

fn create_progress_bar(parent: HWND) -> Result<HWND> {
    let parent_client_bounds = form::get_client_rect(parent)?;
    let cx_padding = form::dip_to_px(parent, 24);
    let height = form::dip_to_px(parent, 20);
    let h_wnd = form::create_window(
        Some(parent),
        "msctls_progress32",
        "",
        WindowsAndMessaging::WS_CHILD | WindowsAndMessaging::WS_VISIBLE,
        Default::default(),
        RECT {
            left: parent_client_bounds.left + cx_padding,
            right: parent_client_bounds.right - cx_padding,
            top: 0,
            bottom: height,
        },
    )?;
    form::center_window_in_rect(h_wnd, parent_client_bounds)?;
    Ok(h_wnd)
}

impl WebViewInstallForm {
    pub fn create() -> Result<Self> {
        let h_wnd = create_window()?;
        let progress_bar_h_wnd = create_progress_bar(h_wnd)?;
        Ok(Self {
            h_wnd,
            progress_bar_h_wnd,
        })
    }

    pub fn show(&self, visible: bool) -> Result<()> {
        unsafe {
            WindowsAndMessaging::ShowWindow(
                self.h_wnd,
                if visible {
                    WindowsAndMessaging::SW_SHOW
                } else {
                    WindowsAndMessaging::SW_HIDE
                },
            );

            let h_wnd = self.h_wnd;
            let progress_bar_h_wnd = self.progress_bar_h_wnd;
            std::thread::spawn(move || {
                let cb_buffer = 257_u32;
                let mut buffer = Vec::<u16>::with_capacity(cb_buffer as usize);
                let lp_buffer = PWSTR(buffer.as_mut_ptr());
                match Com::URLDownloadToCacheFileW(
                    None,
                    "https://go.microsoft.com/fwlink/p/?LinkId=2124703",
                    lp_buffer,
                    cb_buffer,
                    0,
                    std::mem::transmute::<_, Com::IBindStatusCallback>(&&BindStatusCallback::new(
                        progress_bar_h_wnd,
                    )),
                ) {
                    Ok(()) => {
                        WindowsAndMessaging::MessageBoxW(
                            h_wnd,
                            "Click OK to launch the installer.\nPlease restart Lito Music after installation.",
                            "Information",
                            WindowsAndMessaging::MB_ICONINFORMATION,
                        );
                        let filename = pwstr::string_from_pwstr(lp_buffer);
                        Shell::ShellExecuteW(
                            None,
                            "open",
                            filename,
                            None,
                            None,
                            std::mem::transmute(WindowsAndMessaging::SW_SHOWNORMAL),
                        );
                    }
                    Err(e) => {
                        WindowsAndMessaging::MessageBoxW(
                            h_wnd,
                            format!(
                                "Error: {:?}\nPlease download and install the runtime manually.",
                                e
                            ),
                            "Error",
                            WindowsAndMessaging::MB_ICONERROR,
                        );
                    }
                }
                WindowsAndMessaging::SendMessageW(
                    h_wnd,
                    WindowsAndMessaging::WM_CLOSE,
                    WPARAM(0),
                    LPARAM(0),
                );
            });
            Ok(())
        }
    }
}

unsafe extern "system" fn wndproc(
    h_wnd: HWND,
    msg: u32,
    w_param: WPARAM,
    l_param: LPARAM,
) -> LRESULT {
    match msg {
        WindowsAndMessaging::WM_DESTROY => {
            WindowsAndMessaging::PostQuitMessage(0);
            LRESULT(0)
        }
        _ => WindowsAndMessaging::DefWindowProcW(h_wnd, msg, w_param, l_param),
    }
}

#[implement(Windows::Win32::System::Com::IBindStatusCallback)]
#[derive(Clone, Copy)]
struct BindStatusCallback(HWND);

#[allow(non_snake_case)]
impl BindStatusCallback {
    fn new(progress_bar_h_wnd: HWND) -> Self {
        Self(progress_bar_h_wnd)
    }

    pub fn OnStartBinding(&self, _dwreserved: u32, _pib: &Option<Com::IBinding>) -> HRESULT {
        E_NOTIMPL
    }

    pub fn GetPriority(&self) -> Result<i32> {
        Ok(0)
    }

    pub fn OnLowResource(&self, _reserved: u32) -> HRESULT {
        S_OK
    }

    pub unsafe fn OnProgress(
        &self,
        ulprogress: u32,
        ulprogressmax: u32,
        _ulstatuscode: u32,
        _szstatustext: PWSTR,
    ) -> HRESULT {
        let h_wnd = self.0;
        if WindowsAndMessaging::IsWindow(h_wnd).as_bool() {
            WindowsAndMessaging::SendMessageW(
                h_wnd,
                Controls::PBM_SETRANGE,
                WPARAM(0),
                LPARAM(0 | (ulprogressmax << 16) as isize),
            );
            WindowsAndMessaging::SendMessageW(
                h_wnd,
                Controls::PBM_SETPOS,
                WPARAM(ulprogress as usize),
                LPARAM(0),
            );
        }
        S_OK
    }

    pub fn OnStopBinding(&self, _hresult: HRESULT, _szerrorr: PWSTR) -> HRESULT {
        E_NOTIMPL
    }

    pub unsafe fn GetBindInfo(
        &self,
        _grfbindf: *mut u32,
        _pbindinfoo: *mut Com::BINDINFO,
    ) -> HRESULT {
        E_NOTIMPL
    }

    pub fn OnDataAvailable(
        &self,
        _grfbscf: u32,
        _dwsize: u32,
        _pformatetc: *const Com::FORMATETC,
        _pstgmed: *const Com::STGMEDIUM,
    ) -> HRESULT {
        E_NOTIMPL
    }

    pub fn OnObjectAvailable(&self, _riid: *const Guid, _punkk: &Option<IUnknown>) -> HRESULT {
        E_NOTIMPL
    }
}
