import Octicon from '../../common/Octicon.jsx'
import React from 'react'
import './index.css'

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

export default function Splash (data) {
  const repoList = data.repos.map(Repo)

  return (
    <div className="splash-page">
      <div className="toolbar">
        <div className="ghost-bg"></div>
        <div className="content">
          <button><Octicon name="plus" /></button>
          <button><Octicon name="gear" /></button>
        </div>
      </div>
      <ul className="repos">
        { repoList }
      </ul>
    </div>
  )
}
