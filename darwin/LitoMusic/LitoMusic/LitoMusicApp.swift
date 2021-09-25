//
//  LitoMusicApp.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/24.
//

import SwiftUI

@main
struct LitoMusicApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .edgesIgnoringSafeArea(.all)
                .frame(minWidth: 1024, idealWidth: 1024,
                       minHeight: 768, idealHeight: 768)
                .background(VisualEffectView(material: .sidebar, blendingMode: .behindWindow).ignoresSafeArea())
                .preferredColorScheme(.light)
                .toolbar { Text(" ") }
        }
        .windowStyle(HiddenTitleBarWindowStyle())
        // TODO: Make toolbar exactly 60dip in height so that traffic lights could be vertically centered.
        .windowToolbarStyle(UnifiedWindowToolbarStyle())
    }
}
