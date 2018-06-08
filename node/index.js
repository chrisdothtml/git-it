const path = require('path')
const windowStateKeeper = require('electron-window-state')
const { app, BrowserWindow, ipcMain } = require('electron')
const { getReposFromDir } = require('./git.js')
const { buildQuery } = require('./utils.js')

function loadScreen (window, screen, data = {}) {
  const query = buildQuery(data)

  if (process.env.NODE_ENV === 'production') {
    window.loadFile(`dist/${screen}.html?${query}`)
  } else {
    window.loadURL(`http://localhost:${process.env.PORT || 8080}/${screen}.html?${query}`)
  }
}

app.on('ready', () => {
  const windowState = windowStateKeeper({
    defaultHeight: 625,
    defaultWidth: 400,
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

  loadScreen(window, 'splash')
  windowState.manage(window)
})

ipcMain.on('fetch-repos', (event) => {
  // TODO: set in preferences - https://github.com/nathanbuchar/electron-settings
  const reposPath = '/Users/chris/projects'

  getReposFromDir(reposPath)
    .then(repos => event.sender.send('receive-repos', repos))
    .catch(e => console.error(e))
})

ipcMain.on('open-clone', (event, repoPath) => {
  console.log('opening clone')
})

ipcMain.on('open-repo', (event, repoPath) => {
  const pathParts = repoPath.split(path.sep)
  const repoName = pathParts[pathParts.length - 1]
  const windowState = windowStateKeeper({
    defaultHeight: 500,
    defaultWidth: 800,
  })
  const window = new BrowserWindow({
    acceptFirstMouse: true,
    backgroundColor: '#fff',
    height: windowState.height,
    title: `Git It - ${repoName}`,
    width: windowState.width,
    x: windowState.x,
    y: windowState.y,
  })

  loadScreen(window, 'repo', { name: repoName })
  windowState.manage(window)
})

ipcMain.on('open-settings', (event, repoPath) => {
  console.log('opening settings')
})
