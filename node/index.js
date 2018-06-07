const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { getReposFromDir } = require('./git.js')

app.on('ready', () => {
  const win = new BrowserWindow({
    acceptFirstMouse: true,
    backgroundColor: '#fff',
    fullscreen: false,
    height: 625,
    maximizable: false,
    resizable: false,
    width: 400,
    titleBarStyle: 'hidden',
    title: 'GitIt',
    icon: path.join(__dirname, '../icons/icon.icns'),
  })

  if (process.env.NODE_ENV === 'production') {
    win.loadFile('dist/splash.html')
  } else {
    win.loadURL(`http://localhost:${process.env.PORT || 8080}/splash.html`)
  }
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
