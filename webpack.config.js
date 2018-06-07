const fs = require('pfs')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')
const postCSSNesting = require('postcss-nesting')

const SCREENS_PATH = path.resolve(__dirname, 'browser/screens')

async function getEntries () {
  const screens = await fs.readdir(SCREENS_PATH)

  return screens
    // only include directories
    .filter(filename => !path.extname(filename))
    .reduce((result, screenName) => {
      const entryPath = path.join(SCREENS_PATH, screenName, 'index.js')
      return Object.assign(result, { [screenName]: entryPath })
    }, {})
}

function getHtmlPlugins (entry) {
  const template = path.join(SCREENS_PATH, 'webpack-template.html')

  return Object.keys(entry).map(entryName => {
    return new HtmlPlugin({
      chunks: [entryName],
      filename: `${entryName}.html`,
      template,
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
