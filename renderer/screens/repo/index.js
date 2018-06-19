import React from 'react'
import ReactDOM from 'react-dom'
import Repo from './Repo.jsx'
import { hot } from 'react-hot-loader'
import { parseQuery } from '../../common/utils.js'

ReactDOM.render(
  React.createElement(hot(module)(Repo), parseQuery(window.location.search)),
  document.getElementById('root')
)
