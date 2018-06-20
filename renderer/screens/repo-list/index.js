import React from 'react'
import ReactDOM from 'react-dom'
import RepoList from './RepoList.jsx'
import { hot } from 'react-hot-loader'

ReactDOM.render(
  React.createElement(hot(module)(RepoList)),
  document.getElementById('root')
)
