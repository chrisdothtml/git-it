import React from 'react'
import ReactDOM from 'react-dom'
import Splash from './index.jsx'
import { ipcRenderer } from 'electron'
import { hot } from 'react-hot-loader'

const ROOT_ELEMENT = document.getElementById('root')

// add platform class to body
document.body.classList.add(`platform-${process.platform}`)

ipcRenderer.send('fetch-repos')
ipcRenderer.on('receive-repos', (event, repos) => {
  ReactDOM.render(
    React.createElement(hot(module)(Splash), { repos }),
    ROOT_ELEMENT
  )
})
