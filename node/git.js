const fs = require('fs')
const git = require('isomorphic-git')

exports.getBranches = async function (repoPath) {
  return git.listBranches({
    dir: repoPath,
    fs
  })
}
