use std::rc::Rc;

use bindings::{
    Microsoft::{
        self,
        Web::WebView2::Win32::{
            CreateCoreWebView2EnvironmentWithOptions, GetAvailableCoreWebView2BrowserVersionString,
            ICoreWebView2CompositionController, ICoreWebView2Controller2, ICoreWebView2Environment,
            ICoreWebView2Environment3, ICoreWebView2EnvironmentOptions, ICoreWebView2Settings3,
            COREWEBVIEW2_COLOR, COREWEBVIEW2_MOUSE_EVENT_KIND,
            COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS,
        },
    },
    Windows::{
        self,
        Win32::{
            Foundation::{BOOL, E_NOTIMPL, E_POINTER, HWND, LPARAM, POINT, PWSTR, S_OK, WPARAM},
            Graphics::DirectComposition,
            System::WinRT::EventRegistrationToken,
            UI::{Controls, KeyboardAndMouseInput, Shell, WindowsAndMessaging},
        },
    },
};
use once_cell::unsync::OnceCell;
use windows::*;

use crate::{callback, form, pwstr, DEBUG};

pub fn get_version() -> Result<String> {
    let mut versioninfo = PWSTR::default();
    unsafe {
        GetAvailableCoreWebView2BrowserVersionString(None, &mut versioninfo)?;
    }
    Ok(pwstr::take_pwstr(versioninfo))
}

#[derive(Clone)]
pub struct WebView {
    parent: HWND,
    dcomp_device: DirectComposition::IDCompositionDevice,
    root_visual_target: IUnknown,
    controller: Rc<OnceCell<ICoreWebView2Controller2>>,
}

impl WebView {
    pub fn new(
        parent: HWND,
        dcomp_device: DirectComposition::IDCompositionDevice,
        root_visual_target: IUnknown,
    ) -> Self {
        let controller = Rc::new(OnceCell::new());
        Self {
            parent,
            dcomp_device,
            root_visual_target,
            controller,
        }
    }

    pub fn get_controller(&self) -> Option<&ICoreWebView2Controller2> {
        self.controller.get()
    }

    pub fn create(&mut self, completion: impl FnOnce() + 'static) -> Result<()> {
        let parent = self.parent;
        let dcomp_device = self.dcomp_device.clone();
        let root_visual_target: IUnknown = self.root_visual_target.clone();
        let controller_cell = self.controller.clone();

        let cursor_changed_handler = Box::new(
            move |comp_controller: Option<ICoreWebView2CompositionController>,
                  _args: Option<IUnknown>|
                  -> Result<()> {
                unsafe {
                    let comp_controller =
                        comp_controller.ok_or_else(|| Error::fast_error(E_POINTER))?;
                    let mut cursor = Default::default();
                    comp_controller.get_Cursor(&mut cursor)?;
                    WindowsAndMessaging::SetClassLongPtrW(
                        parent,
                        WindowsAndMessaging::GCLP_HCURSOR,
                        std::mem::transmute(cursor),
                    );
                    Ok(())
                }
            },
        );

        let composition_controller_completed_handler = Box::new(
            move |error_code: Result<()>,
                  comp_controller: Option<ICoreWebView2CompositionController>|
                  -> Result<()> {
                unsafe {
                    error_code?;
                    let comp_controller =
                        comp_controller.ok_or_else(|| Error::fast_error(E_POINTER))?;
                    comp_controller.put_RootVisualTarget(root_visual_target)?;
                    let mut _token = EventRegistrationToken::default();
                    comp_controller.add_CursorChanged(
                        callback::CursorChangedEventHandler::create(cursor_changed_handler),
                        &mut _token,
                    )?;
                    dcomp_device.Commit()?;
                    let controller: ICoreWebView2Controller2 = comp_controller.cast()?;
                    controller.put_DefaultBackgroundColor(COREWEBVIEW2_COLOR {
                        A: 0,
                        ..Default::default()
                    })?;
                    if !DEBUG {
                        let webview2 = controller.get_CoreWebView2()?;
                        let settings: ICoreWebView2Settings3 = webview2.get_Settings()?.cast()?;
                        settings.put_AreDefaultContextMenusEnabled(false)?;
                        settings.put_AreDevToolsEnabled(false)?;
                        settings.put_IsStatusBarEnabled(false)?;
                        settings.put_IsZoomControlEnabled(false)?;
                        settings.put_AreBrowserAcceleratorKeysEnabled(false)?;
                    }
                    controller_cell.set(controller).unwrap();
                    completion();
                    Ok(())
                }
            },
        );

        let environment_completed_handler = Box::new(
            move |error_code: Result<()>, env: Option<ICoreWebView2Environment>| -> Result<()> {
                unsafe {
                    error_code?;
                    let env: ICoreWebView2Environment3 =
                        env.ok_or_else(|| Error::fast_error(E_POINTER))?.cast()?;
                    env.CreateCoreWebView2CompositionController(
                        parent,
                        callback::CreateCoreWebView2CompositionControllerCompletedHandler::create(
                            composition_controller_completed_handler,
                        ),
                    )
                }
            },
        );

        unsafe {
            let local_app_data_dir = pwstr::take_pwstr(Shell::SHGetKnownFolderPath(
                &Shell::FOLDERID_LocalAppData,
                0,
                None,
            )?);
            // TODO: Use PathCchCombine?
            let user_data_folder = local_app_data_dir + "\\Lito\\Lito.WebView2";
            CreateCoreWebView2EnvironmentWithOptions(
                None,
                user_data_folder,
                ICoreWebView2EnvironmentOptions::from(EnvironmentOptions::new(
                    "--disable-web-security --enable-features=OverlayScrollbar",
                )),
                callback::CreateCoreWebView2EnvironmentCompletedHandler::create(
                    environment_completed_handler,
                ),
            )
        }
    }

    pub fn forward_mouse_messages(
        &self,
        h_wnd: HWND,
        msg: u32,
        w_param: WPARAM,
        l_param: LPARAM,
    ) -> bool {
        let controller = self.get_controller();
        if controller.is_none() {
            return false;
        }
        let controller = controller.unwrap();
        if WindowsAndMessaging::WM_MOUSEFIRST <= msg && msg <= WindowsAndMessaging::WM_MOUSELAST
            || msg == Controls::WM_MOUSELEAVE
        {
            match msg {
                WindowsAndMessaging::WM_MOUSEMOVE => unsafe {
                    KeyboardAndMouseInput::TrackMouseEvent(
                        &mut KeyboardAndMouseInput::TRACKMOUSEEVENT {
                            cbSize: std::mem::size_of::<KeyboardAndMouseInput::TRACKMOUSEEVENT>()
                                as u32,
                            dwFlags: KeyboardAndMouseInput::TME_LEAVE,
                            hwndTrack: h_wnd,
                            dwHoverTime: 0,
                        },
                    );
                },
                WindowsAndMessaging::WM_LBUTTONDOWN
                | WindowsAndMessaging::WM_MBUTTONDOWN
                | WindowsAndMessaging::WM_RBUTTONDOWN => unsafe {
                    if KeyboardAndMouseInput::GetCapture() != h_wnd {
                        KeyboardAndMouseInput::SetCapture(h_wnd);
                    }
                },
                WindowsAndMessaging::WM_LBUTTONUP
                | WindowsAndMessaging::WM_MBUTTONUP
                | WindowsAndMessaging::WM_RBUTTONUP => unsafe {
                    if KeyboardAndMouseInput::GetCapture() == h_wnd {
                        KeyboardAndMouseInput::ReleaseCapture();
                    }
                },
                _ => {}
            };
            let mouse_data: u32 = match msg {
                WindowsAndMessaging::WM_MOUSEWHEEL | WindowsAndMessaging::WM_MOUSEHWHEEL => {
                    ((w_param.0 >> 16) & 0xffff) as _
                }
                WindowsAndMessaging::WM_XBUTTONDBLCLK
                | WindowsAndMessaging::WM_XBUTTONDOWN
                | WindowsAndMessaging::WM_XBUTTONUP => ((w_param.0 >> 16) & 0xffff) as _,
                _ => 0,
            };
            let mut point = POINT {
                x: (l_param.0 & 0xffff) as i32,
                y: ((l_param.0 >> 16) & 0xffff) as i32,
            };
            if msg == WindowsAndMessaging::WM_MOUSEWHEEL
                || msg == WindowsAndMessaging::WM_MOUSEHWHEEL
            {
                point = form::point_screen_to_client(h_wnd, point);
            }
            if msg != Controls::WM_MOUSELEAVE {
                let mut bounds = Default::default();
                unsafe { controller.get_Bounds(&mut bounds) }.unwrap();
                point.x -= bounds.left;
                point.y -= bounds.top;
            }
            let comp_controller: ICoreWebView2CompositionController = controller.cast().unwrap();
            unsafe {
                comp_controller
                    .SendMouseInput(
                        COREWEBVIEW2_MOUSE_EVENT_KIND(msg as i32),
                        COREWEBVIEW2_MOUSE_EVENT_VIRTUAL_KEYS((w_param.0 & 0xffff) as i32),
                        mouse_data,
                        point,
                    )
                    .unwrap();
            }
            return true;
        }
        false
    }
}

#[implement(Microsoft::Web::WebView2::Win32::ICoreWebView2EnvironmentOptions)]
struct EnvironmentOptions(String);

#[allow(non_snake_case)]
impl EnvironmentOptions {
    fn new(additional_browser_arguments: &str) -> Self {
        Self(additional_browser_arguments.to_string())
    }

    fn AdditionalBrowserArguments(&self, value: *mut PWSTR) -> HRESULT {
        unsafe {
            *value = pwstr::pwstr_from_str_copy(self.0.as_ref());
        }
        S_OK
    }

    fn SetAdditionalBrowserArguments(&self, _value: PWSTR) -> HRESULT {
        E_NOTIMPL
    }

    fn AllowSingleSignOnUsingOSPrimaryAccount(&self, _allow: *mut BOOL) -> HRESULT {
        E_NOTIMPL
    }

    fn SetAllowSingleSignOnUsingOSPrimaryAccount(&self, _allow: BOOL) -> HRESULT {
        E_NOTIMPL
    }

    fn Language(&self, _value: *mut PWSTR) -> HRESULT {
        E_NOTIMPL
    }

    fn SetLanguage(&self, _value: PWSTR) -> HRESULT {
        E_NOTIMPL
    }

    fn TargetCompatibleBrowserVersion(&self, value: *mut PWSTR) -> HRESULT {
        unsafe {
            *value = pwstr::pwstr_from_str_copy("93.0.961.33");
        }
        S_OK
    }

    fn SetTargetCompatibleBrowserVersion(&self, _value: PWSTR) -> HRESULT {
        E_NOTIMPL
    }
}
