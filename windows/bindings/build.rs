fn main() {
    windows::build! {
        Microsoft::Web::WebView2::Win32::*,
        Windows::Win32::Foundation::{
            E_NOINTERFACE, E_POINTER, E_NOTIMPL, HINSTANCE, LRESULT, POINT, PWSTR, RECT, SIZE, S_OK,
        },
        Windows::Win32::Graphics::Direct2D::*,
        Windows::Win32::Graphics::Dwm::*,
        Windows::Win32::Graphics::Dxgi::*,
        Windows::Win32::Graphics::Gdi::*,
        Windows::Win32::System::Com::{CoCreateInstance, CoInitializeEx},
        Windows::Win32::System::{
            Com::{CoTaskMemAlloc, CoTaskMemFree},
            LibraryLoader::{FreeLibrary, LoadLibraryW, GetModuleHandleW, GetProcAddress},
            Threading::GetCurrentThreadId,
            WinRT::EventRegistrationToken,
        },
        Windows::Win32::UI::{
            Controls::*,
            HiDpi::{GetDpiForWindow, SetProcessDpiAwareness, PROCESS_DPI_AWARENESS},
            KeyboardAndMouseInput::{GetCapture, ReleaseCapture, SetCapture, SetFocus, TrackMouseEvent},
            Shell::SHCreateMemStream,
            WindowsAndMessaging::*,
        },
        Windows::Win32::Graphics::Direct3D11::*,
        Windows::Win32::Graphics::DirectComposition::*,
    };
}
