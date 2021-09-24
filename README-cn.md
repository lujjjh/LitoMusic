<h1 align="center">
  <a href="#readme">
    <img src="/logo.svg" width="100" height="100" alt="Lito Music" /><br />
    Lito Music
  </a>
</h1>
<p align="center">
  <a href="https://github.com/lujjjh/lito/releases"><img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/lujjjh/lito?sort=semver" /></a>
</p>
<p align="center">
  <a href="README.md">English</a>
  |
  中文
</p>

**Lito (/laɪto/) Music** 是一个轻量级的 Windows Apple Music 客户端，使用 MusicKit JS、Edge WebView2 和 React 构建。

## 系统需求

- 操作系统版本 ≥ Windows 10。
- Edge WebView2 运行时 (预装于 Windows 10 Insider Preview 和 Windows 11)。  
  若未安装，Lito Music 会在首次启动时尝试下载和安装。

## 下载

> 注意：Windows Defender 可能会对预编译版本产生误报。代码签名应当可以解决问题，但[其价格](https://www.google.com/search?q=code+signing+certificates+price)对开源软件开发者并不友好。如果你对此感到介意，欢迎[在自己的机器上构建](#构建)。

预编译版本可[在此获取][releases]。

## 特性

### 现在就听

<img src="https://user-images.githubusercontent.com/3000535/134614721-7121c8d3-87d1-41cc-af19-9c506c2380b3.png" width="600" alt="Lito Music (现在就听)" />

### 时间同步歌词

<img src="https://user-images.githubusercontent.com/3000535/134615011-206617c5-d958-47d5-aef3-d9d541f366f7.png" width="600" alt="Lito Music (歌词)" />

## 构建

需安装 Rust 和 Node.js。

```powershell
npm install
npm run build
```

[releases]: https://github.com/lujjjh/lito/releases
