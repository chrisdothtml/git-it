const fs = require('pfs')

exports.buildQuery = data => {
  return Object.keys(data)
  .map(key => `${key}=${data[key]}`)
  .join('&')
}

exports.pathExists = filepath => {
  return fs.access(filepath)
    .then(() => true)
    .catch(() => false)
}

exports.sortAlpha = (a, b) => {
  return a.localeCompare(b)
}
