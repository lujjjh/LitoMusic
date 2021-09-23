use bindings::{
    Microsoft::Web::WebView2::Win32::{
        ICoreWebView2, ICoreWebView2WebMessageReceivedEventArgs,
        ICoreWebView2WebResourceRequestedEventHandler, COREWEBVIEW2_WEB_RESOURCE_CONTEXT_ALL,
    },
    Windows::Win32::{
        Foundation::{E_POINTER, HWND, LPARAM, LRESULT, PWSTR, RECT, WPARAM},
        Graphics::{DirectComposition, Dwm},
        System::Com,
        UI::{Controls, KeyboardAndMouseInput, WindowsAndMessaging},
    },
};
use serde::{Deserialize, Serialize};
use windows::*;

use crate::{
    callback,
    composition::WebViewFormComposition,
    env::ParsedArgs,
    form::{self, center_window, dip_to_px},
    pwstr,
    shell::NotificationIcon,
    web_resource_handler::WebResourceHandler,
    webview, APP_URL, DEBUG,
};

const CLASS_NAME: &str = "LitoMainForm";

const WM_USER_WEBVIEW_CREATE: u32 = WindowsAndMessaging::WM_USER;
const WM_USER_ICONNOTIFY: u32 = WindowsAndMessaging::WM_USER + 1;

pub struct MainForm {
    h_wnd: HWND,
    _notification_icon: NotificationIcon,
    composition: WebViewFormComposition,
    webview: webview::WebView,
}

pub fn init() -> Result<()> {
    unsafe { Com::CoInitializeEx(std::ptr::null_mut(), Com::COINIT_APARTMENTTHREADED)? };
    form::register_class(CLASS_NAME, Some(wndproc))?;
    Ok(())
}

fn create_window() -> Result<HWND> {
    let h_wnd = form::create_window(
        None,
        CLASS_NAME,
        "Lito Music",
        WindowsAndMessaging::WS_OVERLAPPEDWINDOW,
        WindowsAndMessaging::WS_EX_NOREDIRECTIONBITMAP,
        RECT::default(),
    )?;
    form::set_window_bounds(
        h_wnd,
        RECT {
            right: dip_to_px(h_wnd, 1024),
            bottom: dip_to_px(h_wnd, 768),
            ..Default::default()
        },
    )?;
    center_window(h_wnd)?;
    Ok(h_wnd)
}

impl MainForm {
    pub fn create() -> Result<Self> {
        let h_wnd = create_window()?;
        unsafe {
            Dwm::DwmExtendFrameIntoClientArea(
                h_wnd,
                &Controls::MARGINS {
                    cxLeftWidth: -1,
                    cyTopHeight: -1,
                    cxRightWidth: -1,
                    cyBottomHeight: -1,
                },
            )?;
        }
        let notification_icon = NotificationIcon::new(h_wnd, Some(WM_USER_ICONNOTIFY));
        notification_icon.show(true);
        let webview_composition = WebViewFormComposition::new(h_wnd)?;
        let mut webview = webview::WebView::new(
            h_wnd,
            webview_composition.get_dcomp_device().clone(),
            webview_composition.get_webview_visual().cast()?,
        );
        webview.create(move || unsafe {
            WindowsAndMessaging::PostMessageW(
                h_wnd,
                WM_USER_WEBVIEW_CREATE,
                WPARAM::default(),
                LPARAM::default(),
            );
        })?;
        Ok(Self {
            h_wnd,
            _notification_icon: notification_icon,
            webview,
            composition: webview_composition,
        })
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

    unsafe fn wndproc(
        &'static self,
        h_wnd: HWND,
        msg: u32,
        w_param: WPARAM,
        l_param: LPARAM,
    ) -> Option<LRESULT> {
        let webview = &self.webview;
        webview.forward_mouse_messages(h_wnd, msg, w_param, l_param);
        match msg {
            WM_USER_ICONNOTIFY => {
                match l_param.0 as u32 {
                    WindowsAndMessaging::WM_LBUTTONDBLCLK => {
                        self.show(true);
                        WindowsAndMessaging::ShowWindow(
                            self.h_wnd,
                            WindowsAndMessaging::SW_RESTORE,
                        );
                    }
                    _ => {}
                };
                Some(LRESULT(0))
            }
            WM_USER_WEBVIEW_CREATE => {
                let rect = form::get_client_rect(h_wnd).unwrap();
                let width = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                let l_param = LPARAM(((width & 0xffff) | ((height & 0xffff) << 16)) as isize);
                WindowsAndMessaging::PostMessageW(
                    h_wnd,
                    WindowsAndMessaging::WM_SIZE,
                    WPARAM(WindowsAndMessaging::SIZE_RESTORED as usize),
                    l_param,
                );
                if let Some(controller) = webview.get_controller() {
                    let webview2 = controller.get_CoreWebView2().unwrap();
                    if !DEBUG {
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
                    }
                    if ParsedArgs::from_args().dev_tools() {
                        webview2.OpenDevToolsWindow().unwrap();
                    }
                    let mut _token = Default::default();
                    webview2
                        .add_WebMessageReceived(
                            callback::WebMessageReceivedEventHandler::create(Box::new(
                                move |webview2, args| self.web_message_received(webview2, args),
                            )),
                            &mut _token,
                        )
                        .unwrap();
                    webview2
                        .AddScriptToExecuteOnDocumentCreated(
                            r#"
                                document.addEventListener("mousedown", event => {
                                    if (event.button !== 0) return
                                    const appRegion = window.getComputedStyle(event.target).getPropertyValue('-webkit-app-region')
                                    if (appRegion === 'drag') {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        if (event.detail % 2 == 0) {
                                            window.chrome.webview.postMessage({ event: "CaptionDblClick" })
                                        } else {
                                            window.chrome.webview.postMessage({ event: "CaptionMouseDown" })
                                        }
                                    }
                                })
                            "#,
                            None,
                        )
                        .unwrap();
                    webview2
                        .Navigate(APP_URL.to_string() + "index.html")
                        .unwrap();
                    controller.put_IsVisible(true).unwrap();
                    self.show(true);
                }
                Some(LRESULT(0))
            }
            WindowsAndMessaging::WM_NCHITTEST => {
                let result = self.composition.nc_hittest(l_param).unwrap();
                if result != WindowsAndMessaging::HTNOWHERE {
                    Some(LRESULT(result as i32))
                } else {
                    Some(LRESULT(WindowsAndMessaging::HTCLIENT as i32))
                }
            }
            WindowsAndMessaging::WM_MOVING => {
                if let Some(controller) = self.webview.get_controller() {
                    controller.NotifyParentWindowPositionChanged().unwrap();
                }
                None
            }
            WindowsAndMessaging::WM_SIZE => {
                let is_minimized = w_param.0 == WindowsAndMessaging::SIZE_MINIMIZED as usize;
                if is_minimized {
                    self.show(false);
                }
                self.composition.update(w_param).unwrap();
                let width = (l_param.0 & 0xffff) as i32;
                let height = ((l_param.0 >> 16) & 0xffff) as i32;
                if let Some(controller) = webview.get_controller() {
                    let mut bounds = RECT {
                        right: width,
                        bottom: height,
                        ..Default::default()
                    };
                    if w_param.0 == WindowsAndMessaging::SIZE_MAXIMIZED as usize {
                        let cy_frame =
                            WindowsAndMessaging::GetSystemMetrics(WindowsAndMessaging::SM_CYFRAME);
                        let cx_padded_border = WindowsAndMessaging::GetSystemMetrics(
                            WindowsAndMessaging::SM_CXPADDEDBORDER,
                        );
                        bounds.top = cy_frame + cx_padded_border;
                    }
                    controller.put_Bounds(bounds).unwrap();
                    let webview_visual = self.composition.get_webview_visual();
                    // TODO: Remove the workaround when https://github.com/microsoft/win32metadata/issues/600 is fixed.
                    let set_offset_y: unsafe extern "system" fn(
                        DirectComposition::IDCompositionVisual,
                        f32,
                    ) -> HRESULT = std::mem::transmute(webview_visual.vtable().6);
                    set_offset_y(webview_visual.clone(), bounds.top as f32)
                        .ok()
                        .unwrap();
                    self.composition.commit().unwrap();
                }
                Some(LRESULT(0))
            }
            _ => None,
        }
    }

    unsafe fn web_message_received(
        &'static self,
        _webview2: Option<ICoreWebView2>,
        args: Option<ICoreWebView2WebMessageReceivedEventArgs>,
    ) -> Result<()> {
        let args = args.ok_or_else(|| Error::fast_error(E_POINTER))?;
        let mut message = PWSTR::default();
        args.get_WebMessageAsJson(&mut message)?;
        let message = pwstr::take_pwstr(message);
        #[derive(Debug, Serialize, Deserialize)]
        #[serde(tag = "event")]
        enum Message {
            CaptionMouseDown,
            CaptionDblClick,
        }
        match serde_json::from_str::<'_, Message>(message.as_ref()) {
            Ok(message) => match message {
                Message::CaptionMouseDown => {
                    KeyboardAndMouseInput::ReleaseCapture();
                    WindowsAndMessaging::SendMessageW(
                        self.h_wnd,
                        WindowsAndMessaging::WM_NCLBUTTONDOWN,
                        WPARAM(WindowsAndMessaging::HTCAPTION as _),
                        LPARAM::default(),
                    );
                }
                Message::CaptionDblClick => {
                    KeyboardAndMouseInput::ReleaseCapture();
                    WindowsAndMessaging::SendMessageW(
                        self.h_wnd,
                        WindowsAndMessaging::WM_NCLBUTTONDBLCLK,
                        WPARAM(WindowsAndMessaging::HTCAPTION as _),
                        LPARAM::default(),
                    );
                }
            },
            Err(e) => {
                eprintln!("Deserialize message: {:?}", e);
            }
        }
        Ok(())
    }
}

unsafe extern "system" fn wndproc(
    h_wnd: HWND,
    msg: u32,
    w_param: WPARAM,
    l_param: LPARAM,
) -> LRESULT {
    if let Some(result) = wndproc_pre(h_wnd, msg, w_param, l_param) {
        return result;
    }
    let main_form = {
        let ptr = WindowsAndMessaging::GetWindowLongPtrW(h_wnd, WindowsAndMessaging::GWL_USERDATA)
            as *const MainForm;
        if ptr.is_null() {
            None
        } else {
            Some(&*ptr)
        }
    };
    main_form
        .and_then(|main_form| main_form.wndproc(h_wnd, msg, w_param, l_param))
        .unwrap_or_else(|| WindowsAndMessaging::DefWindowProcW(h_wnd, msg, w_param, l_param))
}

unsafe fn wndproc_pre(h_wnd: HWND, msg: u32, w_param: WPARAM, l_param: LPARAM) -> Option<LRESULT> {
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
            Some(LRESULT(0))
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
            Some(LRESULT(0))
        }
        WindowsAndMessaging::WM_DESTROY => {
            WindowsAndMessaging::PostQuitMessage(0);
            Some(LRESULT(0))
        }
        _ => None,
    }
}
