#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod callback;
mod composition;
mod env;
mod form;
mod form_nchittest;
mod main_form;
mod pwstr;
mod web_resource_handler;
mod webview;
mod webview_install_form;

use bindings::Windows::Win32::UI::WindowsAndMessaging;
#[cfg(not(debug_assertions))]
use include_dir::Dir;
use main_form::MainForm;
use webview_install_form::WebViewInstallForm;
use windows::*;

#[macro_use]
extern crate callback_macros;

#[cfg(not(debug_assertions))]
#[macro_use]
extern crate include_dir;

#[cfg(debug_assertions)]
const DEBUG: bool = true;
#[cfg(not(debug_assertions))]
const DEBUG: bool = false;

const APP_URL: &str = if DEBUG {
    "http://127.0.0.1:3000/"
} else {
    "https://app.example/"
};

#[cfg(not(debug_assertions))]
static APP_DIR: Dir = include_dir!("..\\dist");

fn main() -> Result<()> {
    check_webview_installation()?;

    main_form::init()?;
    let main_form = MainForm::create()?;
    main_form.show(false);
    form::dispatch_message_loop()?;

    Ok(())
}

fn check_webview_installation() -> Result<()> {
    match webview::get_version() {
        Ok(_) => Ok(()),
        Err(_) => unsafe {
            let result = WindowsAndMessaging::MessageBoxW(
                None,
                "Edge WebView2 Runtime is missing.\nWould you like to download it now?",
                "Edge WebView2 Runtime",
                WindowsAndMessaging::MB_ICONQUESTION | WindowsAndMessaging::MB_YESNO,
            );
            if result == WindowsAndMessaging::IDYES {
                webview_install_form::init()?;
                let webview_install_form = WebViewInstallForm::create()?;
                webview_install_form.show(true)?;
                form::dispatch_message_loop()?;
            }
            std::process::exit(1);
        },
    }
}
