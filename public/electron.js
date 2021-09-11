const path = require('path')
const { app, BrowserWindow, nativeTheme } = require('electron')
const isDev = require('electron-is-dev')

nativeTheme.themeSource = 'light'

app.commandLine.appendSwitch('--enable-features', 'OverlayScrollbar')
app.commandLine.appendSwitch('--disable-smooth-scrolling')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'Lito',
    titleBarStyle: 'hidden',
    vibrancy: 'sidebar',
    trafficLightPosition: {
      x: 19,
      y: 19,
    },
    webPreferences: {
      plugins: true,
      nativeWindowOpen: true,
      nodeIntegration: false,
      contextIsolation: false,
      allowRunningInsecureContent: true,
      backgroundThrottling: false,
      autoplayPolicy: 'no-user-gesture-required',
    },
    show: false,
  })
  win.webContents.session.webRequest.onHeadersReceived(
    { urls: ['https://amp-api.music.apple.com/*'] },
    (details, callback) => {
      details.responseHeaders['access-control-allow-origin'] = '*'
      callback({ responseHeaders: details.responseHeaders })
    }
  )
  win.once('ready-to-show', () => {
    win.show()
  })

  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
  if (isDev) {
    win.loadURL('http://localhost:3000', { userAgent })
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, 'index.html'))
  }
}

app.once('widevine-ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
