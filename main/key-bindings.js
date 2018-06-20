const windowManager = require('./window-manager.js')
const { globalShortcut } = require('electron')

const KEY_BINDINGS = {
  global: {
    'CmdOrCtrl+Alt+R': () => {
      const menubar = windowManager.get('menubar')

      if (menubar.window.isVisible()) {
        if (menubar.window.isFocused()) {
          menubar.hideWindow()
        } else {
          menubar.window.focus()
        }
      } else {
        menubar.showWindow()
      }
    }
  }
}

exports.registerGlobal = () => {
  const globalBindings = KEY_BINDINGS.global

  Object.keys(globalBindings).forEach(binding => {
    if (!globalShortcut.register(binding, globalBindings[binding])) {
      console.warn(`global keyBind failed: ${binding}`)
    }
  })
}
