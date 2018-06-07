import Octicon from '../../common/Octicon.jsx'
import React from 'react'
import { ipcRenderer } from 'electron'
import './Splash.css'

function Repo (repo, i) {
  return (
    <li key={ i } className="repo">
      <button className="clickbox">
        <span className="repo-name">{ repo.name }</span>
        <div className="repo-branch">
          <Octicon name="git-branch" />
          <span className="branch-label">{ repo.branch }</span>
        </div>
      </button>
    </li>
  )
}

export default class Splash extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      repos: []
    }
  }

  componentDidMount () {
    ipcRenderer.send('fetch-repos')
    ipcRenderer.on('receive-repos', (event, repos) => {
      this.setState({
        loading: false,
        repos
      })
    })
  }

  render () {
    const hasRepos = !this.state.loading && this.state.repos.length
    const repoList = hasRepos ? this.state.repos.map(Repo) : ''

    return (
      <div className="splash-page">
        <div className="toolbar">
          <div className="ghost-bg"></div>
          <div className="content">
            <button title="Clone new repo"><Octicon name="plus" /></button>
            <button title="Settings"><Octicon name="gear" /></button>
          </div>
        </div>
        <ul className="repos">
          { repoList }
        </ul>
      </div>
    )
  }
}
