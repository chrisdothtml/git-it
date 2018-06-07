const fs = require('pfs')
const git = require('isomorphic-git')
const path = require('path')
const { pathExists, sortAlpha } = require('./utils.js')

exports.getBranches = async function (repoPath) {
  return git.listBranches({
    dir: repoPath,
    fs
  })
}

exports.getRepoInfo = async function (repoPath) {
  const pathParts = repoPath.split(path.sep)
  const name = pathParts[pathParts.length - 1]
  const commits = await git.log({
    depth: 10,
    dir: repoPath,
    fs
  })

  return {
    commits,
    name
  }
}

exports.getReposFromDir = async function (reposDir) {
  const dirList = await fs.readdir(reposDir)
  const filtered = await Promise.all(
    dirList.map(async (repoName) => {
      const isGitRepo = await pathExists(path.join(reposDir, repoName, '.git'))

      return isGitRepo ? repoName : false
    })
  )

  return filtered
    .filter(Boolean)
    .sort(sortAlpha)
    .map(name => {
      return {
        // TODO: get actual current branch
        branch: 'master',
        fullpath: path.join(reposDir, name),
        name
      }
    })
}
