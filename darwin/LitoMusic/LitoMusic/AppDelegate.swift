//
//  AppDelegate.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/24.
//

import Foundation

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.mainWindow?.titlebarAppearsTransparent = true
        NSApp.mainWindow?.titleVisibility = .hidden
    }
}
