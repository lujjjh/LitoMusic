#[cfg(not(debug_assertions))]
use bindings::Windows::Win32::UI::Shell;
use bindings::{
    Microsoft::{
        self,
        Web::WebView2::Win32::{
            ICoreWebView2, ICoreWebView2WebResourceRequestedEventArgs, ICoreWebView2_2,
        },
    },
    Windows::Win32::Foundation::{E_POINTER, S_OK},
};
use windows::*;

#[cfg(not(debug_assertions))]
use crate::{pwstr, APP_DIR, APP_URL};

#[implement(Microsoft::Web::WebView2::Win32::ICoreWebView2WebResourceRequestedEventHandler)]
pub struct WebResourceHandler;

#[allow(non_snake_case)]
impl WebResourceHandler {
    pub fn new() -> Self {
        Self
    }

    pub unsafe fn Invoke(
        &self,
        sender: &Option<ICoreWebView2>,
        args: &Option<ICoreWebView2WebResourceRequestedEventArgs>,
    ) -> HRESULT {
        #[cfg(debug_assertions)]
        let invoke = move || -> Result<()> {
            let sender: ICoreWebView2_2 = sender
                .as_ref()
                .ok_or_else(|| Error::fast_error(E_POINTER))?
                .cast()?;
            let env = sender.get_Environment()?;
            let args = args.as_ref().ok_or_else(|| Error::fast_error(E_POINTER))?;
            let response = env.CreateWebResourceResponse(None, 404, "Not Found", None)?;
            args.put_Response(response)?;
            Ok(())
        };
        #[cfg(not(debug_assertions))]
        let invoke = move || -> Result<()> {
            let sender: ICoreWebView2_2 = sender
                .as_ref()
                .ok_or_else(|| Error::fast_error(E_POINTER))?
                .cast()?;
            let env = sender.get_Environment()?;
            let args = args.as_ref().ok_or_else(|| Error::fast_error(E_POINTER))?;
            let request = args.get_Request()?;
            let mut uri = Default::default();
            request.get_Uri(&mut uri)?;
            let uri = pwstr::take_pwstr(uri);
            match uri.strip_prefix(APP_URL) {
                Some(path) => {
                    let response = match APP_DIR.get_file(path) {
                        Some(file) => {
                            let content = file.contents();
                            let content =
                                Shell::SHCreateMemStream(content.as_ptr(), content.len() as u32);
                            let headers = match std::path::Path::new(path)
                                .extension()
                                .and_then(std::ffi::OsStr::to_str)
                                .map(|s| s.to_lowercase())
                                .as_deref()
                            {
                                Some("js") => "content-type: application/javascript",
                                _ => "",
                            };
                            env.CreateWebResourceResponse(content, 200, "OK", headers)?
                        }
                        None => env.CreateWebResourceResponse(None, 404, "Not Found", None)?,
                    };
                    args.put_Response(response)?;
                }
                None => {}
            };
            Ok(())
        };
        match invoke() {
            Ok(()) => S_OK,
            Err(e) => e.code(),
        }
    }
}
