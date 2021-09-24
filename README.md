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
  English
  |
  <a href="README-cn.md">中文</a>
</p>

**Lito (/laɪto/) Music** is a lightweight Apple Music client for Windows, built with MusicKit JS, Edge WebView2 and React.

## System requirements

- OS version ≥ Windows 10.
- Edge WebView2 runtime (pre-installed in Windows 10 Insider Preview and Windows 11).  
  If not installed, Lito Music will try to download and install it at the first launch.

## Downloads

> NOTE: Windows Defender might say the pre-compiled binary is a malware. It's just a false positive.
> Code signing could solve this issue; however, [the price](https://www.google.com/search?q=code+signing+certificates+price)
> is not friendly to an open source developer. If you are concerned about it, please feel free to [build it on your own machine](#build).

Pre-compiled binaries are available [here][releases].

## Features

### Listen now

<img src="https://user-images.githubusercontent.com/3000535/134614721-7121c8d3-87d1-41cc-af19-9c506c2380b3.png" width="600" alt="Lito Music (listen now)" />


### Time-synced lyrics

<img src="https://user-images.githubusercontent.com/3000535/134615011-206617c5-d958-47d5-aef3-d9d541f366f7.png" width="600" alt="Lito Music (lyrics)" />

## Build

Rust and Node.js are required.

```powershell
npm install
npm run build
```

[releases]: https://github.com/lujjjh/lito/releases
