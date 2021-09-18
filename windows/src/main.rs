#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod callback;
mod composition;
mod form;
mod form_nchittest;
mod main_form;
mod pwstr;
mod web_resource_handler;
mod webview;

#[cfg(not(debug_assertions))]
use include_dir::Dir;
use main_form::MainForm;
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
static APP_DIR: Dir = include_dir!("..\\build");

fn main() -> Result<()> {
    main_form::init()?;

    let main_form = MainForm::create()?;
    main_form.show(false);

    main_form::dispatch_message_loop()?;

    Ok(())
}
