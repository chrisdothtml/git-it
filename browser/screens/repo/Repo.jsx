import c from 'classcat'
import Octicon from '../../common/Octicon.jsx'
import React from 'react'
import { ipcRenderer } from 'electron'
import './Repo.css'

export default class Repo extends React.Component {
  constructor (props) {
    super(props)

    this.views = [
      {
        key: 'working-dir',
        name: 'Working directory',
        icon: 'code',
      }, {
        key: 'commit-tree',
        name: 'Commit tree',
        icon: 'circuit-board',
      }, {
        key: 'stashes',
        name: 'Stashes',
        icon: 'watch',
      },
    ]

    this.state = {
      meta: {
        repoName: props.name,
        repoPath: props.path
      },
      view: this.views[0].key,
      workingDir: {},
      commitTree: {},
      stashes: {},
    }
  }

  componentDidMount () {
    ipcRenderer.send('fetch-repo', this.state.meta.repoPath)

    ipcRenderer.on('receive-repo-working-dir', (event, workingDir) => {
      this.setState({ workingDir })
    })

    ipcRenderer.on('receive-repo-commit-tree', (event, commitTree) => {
      this.setState({ commitTree })
    })

    ipcRenderer.on('receive-repo-stashes', (event, stashes) => {
      this.setState({ stashes })
    })
  }

  clickNavButton (event, view) {
    event.preventDefault()

    if (this.state.view !== view) {
      this.setState({ view })
    }
  }

  render () {
    const navButtons = this.views.map((view, i) => {
      const isSelected = this.state.view === view.key

      return (
        <button
          key={ i }
          className={ c(['nav-item', { isSelected }]) }
          title={ view.name }
          onClick={ (e) => this.clickNavButton(e, view.key) }
        >
          <Octicon name={ view.icon } />
        </button>
      )
    })

    return (
      <div className="repo-page">
        <div className="navbar">
          { navButtons }
        </div>
        <div className="content">
          <span>Viewing: { this.state.meta.repoName }</span>
        </div>
      </div>
    )
  }
}
