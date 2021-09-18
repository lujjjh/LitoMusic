use std::{mem, ptr};

use bindings::Windows::Win32::{Foundation::PWSTR, System::Com};

/// Copy a [`PWSTR`] from an input param to a [`String`].
pub fn string_from_pwstr(source: PWSTR) -> String {
    if source.is_null() {
        String::new()
    } else {
        let mut buffer = Vec::new();
        let mut pwz = source.0;

        unsafe {
            while *pwz != 0 {
                buffer.push(*pwz);
                pwz = pwz.add(1);
            }
        }

        String::from_utf16(&buffer).expect("string_from_pwstr")
    }
}

/// Copy a [`PWSTR`] allocated with [`Com::CoTaskMemAlloc`] from an input param to a [`String`]
/// and free the original buffer with [`Com::CoTaskMemFree`].
pub fn take_pwstr(source: PWSTR) -> String {
    let result = string_from_pwstr(source);

    if !source.is_null() {
        unsafe {
            Com::CoTaskMemFree(mem::transmute(source.0));
        }
    }

    result
}

pub fn null_terminated_u16_vec_from_str(source: &str) -> Vec<u16> {
    source
        .encode_utf16()
        .chain(std::iter::once(0))
        .collect::<Vec<_>>()
}

/// Allocate a [`PWSTR`] with [`Com::CoTaskMemAlloc`] and copy a [`&str`] into it.
pub fn pwstr_from_str_copy(source: &str) -> PWSTR {
    match source {
        "" => PWSTR(ptr::null_mut::<u16>()),
        value => {
            let encoded: Vec<_> = value.encode_utf16().chain(std::iter::once(0)).collect();

            unsafe {
                let mut buffer =
                    Com::CoTaskMemAlloc(encoded.len() * mem::size_of::<u16>()) as *mut u16;
                let result = PWSTR(buffer);

                for char in encoded {
                    *buffer = char;
                    buffer = buffer.add(1);
                }

                result
            }
        }
    }
}
