import React from 'react'
import ReactDOM from 'react-dom'
import Splash from './index.jsx'
import { ipcRenderer } from 'electron'
import { hot } from 'react-hot-loader'

ipcRenderer.send('fetch-repos')
ipcRenderer.on('receive-repos', (event, repos) => {
  ReactDOM.render(
    React.createElement(hot(module)(Splash), { repos }),
    document.getElementById('root')
  )
})
