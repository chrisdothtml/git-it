const fs = require('pfs')
const isomorphicGit = require('isomorphic-git')
const path = require('path')
const { pathExists, sortAlpha } = require('./utils.js')

const git = new Proxy(isomorphicGit, {
  wrapper: func => (dir, options = {}) => {
    return func(Object.assign(options, { dir, fs }))
  },
  get (obj, prop) {
    if (typeof obj[prop] === 'function') {
      return this.wrapper(obj[prop])
    } else {
      return obj[prop]
    }
  }
})

// TODO: make this more efficient
exports.getReposFromDir = async function (reposDir) {
  let result = []

  try {
    const dirList = await fs.readdir(reposDir)
    const filtered = await Promise.all(
      dirList.map(async (repoName) => {
        const isGitRepo = await pathExists(path.join(reposDir, repoName, '.git'))
        return isGitRepo ? repoName : false
      })
    )

    return Promise.all(
      filtered
        .filter(Boolean)
        .sort(sortAlpha)
        .map(async (name) => {
          const fullpath = path.join(reposDir, name)

          return {
            branch: await git.currentBranch(fullpath),
            fullpath,
            name
          }
        })
    )
  } catch (error) {
    console.log(error)
  }

  return result
}
