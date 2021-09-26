//
//  WebView.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/24.
//

import SwiftUI
import WebKit

struct WebView : NSViewRepresentable {
    let window: NSWindow?
    let request: URLRequest
    let configuration: WKWebViewConfiguration
    let windowDelegate = MainWindowDelegate()

    let webView: WKWebView

    init (window: NSWindow? = nil, request: URLRequest, configuration: WKWebViewConfiguration = WKWebViewConfiguration(),
          disableWebSecurity: Bool = false, transparent: Bool = false, injectDragController: Bool = false) {
        self.window = window
        self.request = request
        self.configuration = configuration
#if !DEBUG
        // TODO: Remove this hack if possible. (It seems MusicKit JS only works under http(s) scheme.)
        configuration.setURLSchemeHandler(LitoSchemeHandler(), forURLScheme: "http")
#endif
        self.webView = WKWebView(frame: NSRect(x: 0, y: 0, width: 0, height: 0), configuration: configuration)
        if disableWebSecurity {
            WDBSetWebSecurityEnabled(webView.configuration.preferences, false)
        }
        if transparent {
            webView.setValue(false, forKey: "drawsBackground")
        }
        if injectDragController {
            webView.configuration.userContentController.add(DragController(), name: "dragController")
        }
        webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
    }

    func makeNSView(context: Context) -> WKWebView {
        webView.uiDelegate = context.coordinator
        webView.navigationDelegate = context.coordinator
        // Quick and dirty...To avoid main window being destoryed.
        DispatchQueue.main.async {
            webView.window?.delegate = windowDelegate
        }
        return webView
    }

    func updateNSView(_ uiView: WKWebView, context: Context) {
        uiView.load(request)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator : NSObject, WKUIDelegate, WKNavigationDelegate {
        let parent: WebView

        init(_ parent: WebView) {
            self.parent = parent
        }

        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            let view = WKWebView(frame: .init(x: 0, y: 0, width: 800, height: 600), configuration: configuration)
            view.navigationDelegate = self
            view.uiDelegate = self

            let viewController = NSViewController()
            viewController.view = view

            let window = NSWindow(contentViewController: viewController)
            window.center()

            webView.window?.contentViewController?.presentAsSheet(viewController)

            return view
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            webView.evaluateJavaScript("""
                document.addEventListener("mousedown", event => {
                    if (event.button !== 0) return
                    const appRegion = window.getComputedStyle(event.target).getPropertyValue('--app-region')
                    if (appRegion === 'drag') {
                        event.preventDefault()
                        event.stopPropagation()
                        window.webkit.messageHandlers.dragController?.postMessage?.('mouseDown')
                    }
                })
            """)

#if !DEBUG
            if !ParsedArgs.shared.devTools {
                webView.evaluateJavaScript("""
                    document.addEventListener("contextmenu", event => {
                        event.preventDefault()
                    })
                """)
            }
#endif
        }

        func webViewDidClose(_ webView: WKWebView) {
            webView.window?.close()
        }
    }

    class DragController : NSObject, WKScriptMessageHandler {
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if let window = NSApplication.shared.mainWindow {
                let nsEvent = NSEvent.mouseEvent(with: .leftMouseDown, location: NSEvent.mouseLocation,
                                                 modifierFlags: .init(rawValue: 0), timestamp: 0, windowNumber: 0,
                                                 context: nil, eventNumber: 0, clickCount: 1, pressure: 0)!
                window.performDrag(with: nsEvent)
            }
        }
    }

    class MainWindowDelegate : NSObject, NSWindowDelegate {
        func windowShouldClose(_ sender: NSWindow) -> Bool {
            NSApp.hide(nil)
            return false
        }
    }
}
