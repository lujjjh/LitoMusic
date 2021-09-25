//
//  LitoMusicApp.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/24.
//

import SwiftUI

@main
struct LitoMusicApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
                .edgesIgnoringSafeArea(.all)
                .frame(minWidth: 1024, idealWidth: 1024,
                       minHeight: 768, idealHeight: 768)
                .background(VisualEffectView(material: .sidebar, blendingMode: .behindWindow).ignoresSafeArea())
                .preferredColorScheme(.light)
        }
        .windowStyle(HiddenTitleBarWindowStyle())
    }
}
