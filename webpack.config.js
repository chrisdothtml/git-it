const fs = require('pfs')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')
const postCSSNesting = require('postcss-nesting')

async function getEntries () {
  const screensPath = path.resolve(__dirname, 'browser/screens')
  const screens = await fs.readdir(screensPath)

  return screens.reduce((result, screenName) => {
    const entryPath = path.join(screensPath, screenName, 'index.js')

    return Object.assign(result, { [screenName]: entryPath })
  }, {})
}

function getHtmlPlugins (entry) {
  return Object.keys(entry).map(entryName => {
    const templatePath = path.join(path.dirname(entry[entryName]), 'index.html')

    return new HtmlPlugin({
      chunks: [entryName],
      filename: `${entryName}.html`,
      template: templatePath,
    })
  })
}

module.exports = async function () {
  const entry = await getEntries()
  const htmlPlugins = getHtmlPlugins(entry)

  return {
    entry,
    output: {
      filename: '[name].js'
    },
    target: 'electron-renderer',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader',
          ]
        }, {
          test: /\.css$/,
          use: [
            { loader: 'style-loader', options: { sourceMap: true } },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              plugins: [ postCSSNesting() ],
            }},
          ],
        }, {
          test: /\.(png)$/,
          use: 'file-loader'
        }
      ]
    },
    devtool: 'inline-source-map',
    plugins: htmlPlugins.concat([
      //
    ]),
  }
}
