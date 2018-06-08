const path = require('path')
const windowStateKeeper = require('electron-window-state')
const { app, BrowserWindow, ipcMain } = require('electron')
const { getReposFromDir } = require('./git.js')

app.on('ready', () => {
  const windowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 625
  })
  const window = new BrowserWindow({
    acceptFirstMouse: true,
    backgroundColor: '#fff',
    fullscreen: false,
    height: windowState.height,
    icon: path.join(__dirname, '../icons/icon.icns'),
    maximizable: false,
    resizable: false,
    title: 'Git It',
    titleBarStyle: 'hidden',
    width: windowState.width,
    x: windowState.x,
    y: windowState.y,
  })

  if (process.env.NODE_ENV === 'production') {
    window.loadFile('dist/splash.html')
  } else {
    window.loadURL(`http://localhost:${process.env.PORT || 8080}/splash.html`)
  }

  windowState.manage(window)
})

ipcMain.on('fetch-repos', (event) => {
  // TODO: set in preferences - https://github.com/nathanbuchar/electron-settings
  const reposPath = '/Users/chris/projects'

  getReposFromDir(reposPath)
    .then(repos => {
      event.sender.send('receive-repos', repos)
    })
    .catch(e => console.error(e))
})

ipcMain.on('open-clone', (event, repoPath) => {
  console.log('opening clone')
})

ipcMain.on('open-repo', (event, repoPath) => {
  console.log(`opening ${repoPath}`)
})

ipcMain.on('open-settings', (event, repoPath) => {
  console.log('opening settings')
})
