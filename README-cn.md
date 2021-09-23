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
<p align="center">
  <img src="https://user-images.githubusercontent.com/3000535/134394206-27d49884-96ef-4197-9dc5-b4177b83c3cb.png" width="600" alt="Lito Music (screenshot)" />
</p>
<p align="center">
  <strong>Lito (/laɪto/) Music</strong>，一个轻量级的 Windows Apple Music 客户端，使用 MusicKit JS、Edge WebView2 和 React 构建。
</p>

## 系统需求

- 操作系统版本 ≥ Windows 10。
- Edge WebView2 运行时 (预装于 Windows 10 Insider Preview 和 Windows 11)。  
  若未安装，Lito Music 会在首次启动时尝试下载和安装。

## 下载

与发行版本可[在此获取][releases]。

## 构建

需安装 Rust 和 Node.js。

```powershell
npm install
npm run build
```

[releases]: https://github.com/lujjjh/lito/releases
