const keyBindings = require('./key-bindings.js')
const path = require('path')
const windowManager = require('./window-manager.js')
const { app, ipcMain } = require('electron')
const { getReposFromDir } = require('./git.js')

app.on('ready', () => {
  windowManager.create('menubar')
  keyBindings.registerGlobal()
})

ipcMain.on('fetch-repos', (event) => {
  // TODO: set in preferences - https://github.com/nathanbuchar/electron-settings
  const reposPath = '/Users/chris/projects'

  getReposFromDir(reposPath)
    .then(repos => event.sender.send('receive-repos', repos))
    .catch(e => console.error(e))
})

ipcMain.on('fetch-repo', (event, repoPath) => {
  // TODO: get working dir, commit tree, stashes in parallel
  console.log('fetching repo', repoPath)
})

ipcMain.on('open-clone', (event, repoPath) => {
  console.log('opening clone')
})

ipcMain.on('open-repo', (event, repoPath) => {
  const window = windowManager.get('repo', repoPath)

  if (window) {
    if (!window.isVisible() || !window.isFocused()) {
      window.show()
      window.focus()
    }
  } else {
    windowManager.create('repo', repoPath)
  }
})

ipcMain.on('open-settings', (event, repoPath) => {
  console.log('opening settings')
})
