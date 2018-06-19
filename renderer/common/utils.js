export function parseQuery (queryString) {
  return queryString
    .replace(/^\?/, '')
    .split('&')
    .reduce((result, query) => {
      const [ key, value ] = query.split('=')
      return Object.assign(result, { [key]: (value || true) })
    }, {})
}
