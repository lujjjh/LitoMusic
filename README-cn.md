<h1 align="center">
  <a href="#readme">
    <img src="/logo.svg" width="100" height="100" alt="Lito Music" /><br />
    Lito Music
  </a>
</h1>
<p align="center">
  <a href="https://github.com/lujjjh/lito/releases"><img alt="GitHub release" src="https://img.shields.io/github/v/release/lujjjh/lito?include_prereleases" /></a>
</p>
<p align="center">
  <a href="README.md">English</a>
  |
  中文
</p>

<p align="center">
  <strong>Lito (/laɪto/) Music</strong> 是一个轻量级的 Windows / macOS Apple Music 客户端，<br />
  使用 MusicKit JS、Edge WebView2 / WKWebView 和 React 构建。
</p>

## 系统需求

- 操作系统版本 ≥ Windows 10 或 macOS 11.0。
- 对 Windows：Edge WebView2 运行时 (预装于 Windows 10 Insider Preview 和 Windows 11)。  
  若未安装，Lito Music 会在首次启动时尝试下载和安装。

## 下载

> 注意：Windows Defender 可能会对预编译版本产生误报。代码签名应当可以解决问题，但[其价格](https://www.google.com/search?q=code+signing+certificates+price)对开源软件开发者并不友好。如果你对此感到介意，欢迎[在自己的机器上构建](#构建)。

预编译版本可[在此获取][releases]。

## 特性

### 现在就听

<img src="https://user-images.githubusercontent.com/3000535/134794764-e974e026-c719-49b5-871f-72466078d4af.png" width="1000" alt="Lito Music (现在就听)" />

### 时间同步歌词

<img src="https://user-images.githubusercontent.com/3000535/134794792-0f0a4a56-c95b-4b02-966c-cbb71c90df20.png" width="1000" alt="Lito Music (时间同步歌词)" />

## 构建

### 对 Windows

需安装 Visual Studio（包括 Windows 10 SDK）、Rust 和 Node.js。

```powershell
npm install
npm run build:windows
```

### 对 macOS

需安装 Xcode 和 Node.js。

```sh
npm install
npm run build:darwin
```

[releases]: https://github.com/lujjjh/lito/releases
