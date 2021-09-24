//
//  ContentView.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        WebView(request: URLRequest(url: URL(string: "http://127.0.0.1:3000")!), disableWebSecurity: true)
    }
}
