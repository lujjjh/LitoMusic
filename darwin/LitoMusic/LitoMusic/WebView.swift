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
    let disableWebSecurity: Bool

    let webView: WKWebView

    init (window: NSWindow? = nil, request: URLRequest, configuration: WKWebViewConfiguration = WKWebViewConfiguration(), disableWebSecurity: Bool = false) {
        self.window = window
        self.request = request
        self.configuration = configuration
        self.disableWebSecurity = disableWebSecurity
        self.webView = WKWebView(frame: NSRect(x: 0, y: 0, width: 0, height: 0), configuration: configuration)
    }

    func makeNSView(context: Context) -> WKWebView {
        webView.uiDelegate = context.coordinator
        webView.navigationDelegate = context.coordinator
        webView.setValue(false, forKey: "drawsBackground")
        if disableWebSecurity {
            WDBSetWebSecurityEnabled(webView.configuration.preferences, false)
        }
        webView.configuration.userContentController.add(context.coordinator, name: "dragController")
        webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
        return webView
    }

    func updateNSView(_ uiView: WKWebView, context: Context) {
        uiView.load(request)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler {
        let parent: WebView

        init(_ parent: WebView) {
            self.parent = parent
        }

        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            let window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 800, height: 600), styleMask: [.titled, .closable, .fullSizeContentView], backing: .buffered, defer: false)
            let newWebView = WebView(window: window, request: navigationAction.request, configuration: configuration)
            window.contentView = NSHostingView(rootView: newWebView)
            window.center()
            window.makeKeyAndOrderFront(nil)
            return newWebView.webView
        }

        func webViewDidClose(_ webView: WKWebView) {
            if let window = self.parent.window {
                window.close()
            }
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
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if let window = NSApplication.shared.mainWindow {
                let nsEvent = NSEvent.mouseEvent(with: .leftMouseDown, location: NSEvent.mouseLocation,
                                                 modifierFlags: .init(rawValue: 0), timestamp: 0, windowNumber: 0,
                                                 context: nil, eventNumber: 0, clickCount: 1, pressure: 0)!
                window.performDrag(with: nsEvent)
            }
        }
    }
}
