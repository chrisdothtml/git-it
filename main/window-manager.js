const menubarCreator = require('menubar')
const path = require('path')
const windowState = require('electron-window-state')
const { BrowserWindow } = require('electron')
const { buildQuery } = require('./utils.js')

const ROOT_PATH = path.resolve(__dirname, '../')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const WINDOWS = {}

function getScreenUrl (filename, data = {}) {
  const query = buildQuery(data)
  const filepath = `${filename}.html?${query}`
  let dirpath

  if (IS_PRODUCTION) {
    dirpath = `file://${path.join(ROOT_PATH, 'dist')}`
  } else {
    dirpath = `http://localhost:${process.env.PORT || 8080}`
  }

  return `${dirpath}/${filepath}`
}

function createMenubar () {
  return menubarCreator({
    alwaysOnTop: !IS_PRODUCTION, // dev only
    icon: path.resolve(ROOT_PATH, 'icons/menubar.png'),
    index: getScreenUrl('splash'),
    preloadWindow: true,
    resizable: false,
    transparent: true,
    vibrancy: 'medium-light',
  })
}

function createRepoWindow (repoPath) {
  const pathParts = repoPath.split(path.sep)
  const repoName = pathParts[pathParts.length - 1]
  const state = windowState({
    defaultHeight: 750,
    defaultWidth: 1150,
    file: 'repo.json',
  })
  const window = new BrowserWindow({
    acceptFirstMouse: true,
    backgroundColor: '#fff',
    height: state.height,
    icon: path.resolve(ROOT_PATH, 'icons/icon.icns'),
    title: `Git It - ${repoName}`,
    width: state.width,
    x: state.x,
    y: state.y,
  })

  window.loadURL(getScreenUrl('repo', { repoName, repoPath }))
  state.manage(window)
  // TODO: add event handlers for window (destroy, etc)
  return window
}

exports.create = function (type, id) {
  let window

  switch (type) {
    case 'menubar':
      window = createMenubar()
      break
    case 'repo':
      window = createRepoWindow(id)
      break
  }

  if (id) {
    WINDOWS[`${type}-${id}`] = window
  } else {
    WINDOWS[type] = window
  }

  return window
}

exports.get = function (type, id) {
  let result

  if (id) {
    result = WINDOWS[`${type}-${id}`]
  } else {
    result = WINDOWS[type]
  }

  return result
}
