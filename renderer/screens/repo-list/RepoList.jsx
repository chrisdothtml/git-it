import Octicon from '../../common/Octicon.jsx'
import React from 'react'
import { ipcRenderer } from 'electron'
import './RepoList.css'

function Repo (props) {
  const { repo } = props

  return (
    <li className="repo">
      <button className="clickbox" onClick={ () => ipcRenderer.send('open-repo', repo.fullpath) }>
        <span className="repo-name">{ repo.name }</span>
        <div className="repo-branch">
          <Octicon name="git-branch" />
          <span className="branch-label">{ repo.branch }</span>
        </div>
      </button>
    </li>
  )
}

function List (props) {
  const { isLoading, repos } = props
  let result

  if (isLoading) {
    result = 'Loading...'
  } else if (repos.length) {
    result = (
      <ul className="repos">
        { repos.map((repo, i) => (
          <Repo repo={ repo } key={ i } />
        )) }
      </ul>
    )
  } else {
    result = 'No repos :('
  }

  return result
}

export default class RepoList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      repos: []
    }
  }

  componentDidMount () {
    ipcRenderer.send('fetch-repos')
    ipcRenderer.on('receive-repos', (event, repos) => {
      this.setState({
        isLoading: false,
        repos
      })
    })
  }

  render () {
    return (
      <div className="repo-list">
        <div className="toolbar">
          <div className="ghost-bg"></div>
          <div className="content">
            <button title="Clone new repo" onClick={ () => ipcRenderer.send('open-clone') }>
              <Octicon name="plus" />
            </button>
            <button title="Settings" onClick={ () => ipcRenderer.send('open-settings') }>
              <Octicon name="gear" />
            </button>
          </div>
        </div>
        <List { ...this.state } />
      </div>
    )
  }
}
