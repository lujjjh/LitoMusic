//
//  LitoSchemeHandler.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/25.
//

import Gzip

enum LitoSchemeHandlerError : Error {
    case unsupportedScheme
    case notFound
}

class LitoSchemeHandler : NSObject, WKURLSchemeHandler {
    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url, let scheme = url.scheme, scheme == "http" else {
            urlSchemeTask.didFailWithError(LitoSchemeHandlerError.unsupportedScheme)
            return
        }

        do {
            let ext = url.pathExtension
            let mimeType: String = {
                switch ext {
                case "html":
                    return "text/html"
                case "js":
                    return "application/javascript"
                default:
                    return "application/octet-stream"
                }
            }()
            let fileUrl = Bundle.main.path(forResource: url.path + ".gz", ofType: nil, inDirectory: "dist")
            guard let fileUrl = fileUrl else {
                urlSchemeTask.didFailWithError(LitoSchemeHandlerError.notFound)
                return
            }
            let data = try (try NSData(contentsOfFile: fileUrl) as Data).gunzipped()
            let response = HTTPURLResponse(url: url,
                                           mimeType: mimeType,
                                           expectedContentLength: data.count,
                                           textEncodingName: nil)
            urlSchemeTask.didReceive(response)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()
        } catch {
            urlSchemeTask.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
    }
}
