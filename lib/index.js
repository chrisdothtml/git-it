const git = require('./git.js')
const { app, BrowserWindow, dialog, ipcMain } = require('electron')

app.on('ready', () => {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('index.html')
})

ipcMain.on('click-open-repo', (event) => {
  const repoPaths = dialog.showOpenDialog({ properties: ['openDirectory'/* , 'multiSelections' */] })

  event.sender.send('open-repo', repoPaths)
})
