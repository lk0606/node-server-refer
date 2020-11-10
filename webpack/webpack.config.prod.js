const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: { children: false, warnings: false },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
})

module.exports = webpackConfig
