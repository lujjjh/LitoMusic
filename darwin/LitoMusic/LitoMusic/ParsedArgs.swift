//
//  ParsedArgs.swift
//  LitoMusic
//
//  Created by lujjjh on 2021/9/26.
//

class ParsedArgs {
    static var shared = ParsedArgs(CommandLine.arguments)

    private(set) var devTools = false

    init(_ args: [String]) {
        for arg in args {
            if arg == "--dev-tools" {
                self.devTools = true
            }
        }
    }
}
