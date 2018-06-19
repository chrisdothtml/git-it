import React from 'react'
import ReactDOM from 'react-dom'
import Splash from './Splash.jsx'
import { hot } from 'react-hot-loader'

ReactDOM.render(
  React.createElement(hot(module)(Splash)),
  document.getElementById('root')
)
