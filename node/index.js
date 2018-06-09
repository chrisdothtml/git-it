const path = require('path')
const windowManager = require('./window-manager.js')
const { app, ipcMain } = require('electron')
const { getReposFromDir } = require('./git.js')

app.on('ready', () => {
  windowManager.create('splash')
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
  windowManager.create('repo', repoPath)
})

ipcMain.on('open-settings', (event, repoPath) => {
  console.log('opening settings')
})
