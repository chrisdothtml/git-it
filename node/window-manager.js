const path = require('path')
const windowState = require('electron-window-state')
const { BrowserWindow } = require('electron')
const { buildQuery } = require('./utils.js')

const WINDOWS = {}
const BASE_PROPS = {
  acceptFirstMouse: true,
  backgroundColor: '#fff',
  icon: path.join(__dirname, '../icons/icon.icns'),
  title: 'Git It',
}
const CONFIGS = {
  splash: {
    defaults: {
      height: 625,
      width: 400,
    },
    props: {
      fullscreen: false,
      maximizable: false,
      resizable: false,
      titleBarStyle: 'hidden',
    },
  },
  repo: {
    defaults: {
      height: 750,
      width: 1150,
    },
    props: {},
  },
}

function loadScreen (window, filename, data = {}) {
  const query = buildQuery(data)

  if (process.env.NODE_ENV === 'production') {
    window.loadFile(`dist/${filename}.html?${query}`)
  } else {
    window.loadURL(`http://localhost:${process.env.PORT || 8080}/${filename}.html?${query}`)
  }
}

exports.create = function (type, id) {
  const config = CONFIGS[type]
  const state = windowState({
    defaultHeight: config.defaults.height,
    defaultWidth: config.defaults.width,
    file: `${type}.json`,
  })
  const window = new BrowserWindow(Object.assign({}, BASE_PROPS, config.props, {
    height: state.height,
    width: state.width,
    x: state.x,
    y: state.y,
  }))

  if (id) {
    WINDOWS[`${type}-${id}`] = window
  } else {
    WINDOWS[type] = window
  }

  if (type === 'repo') {
    const repoPath = id
    const pathParts = repoPath.split(path.sep)
    const repoName = pathParts[pathParts.length - 1]

    window.setTitle(`${window.getTitle()} - ${repoName}`)
    loadScreen(window, type, { repoName, repoPath })
  } else {
    loadScreen(window, type)
  }

  state.manage(window)
  // TODO: add event handlers for window (destroy, etc)
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
