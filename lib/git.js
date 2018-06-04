const fs = require('fs')
const git = require('isomorphic-git')
const path = require('path')

exports.getBranches = async function (repoPath) {
  return git.listBranches({
    fs,
    dir: '.',
    gitdir: repoPath
  })
}
