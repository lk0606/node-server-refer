const { join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
// import { join } from 'path'
// import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const webpackconfig = {
  target: 'node',
  mode: 'none',
  entry: {
    app: join(__dirname, '../app.js'),
  },
  resolve: {
    modules: [join(__dirname, '../app'), 'node_modules'],
    extensions: ['.js', '.json'],
  },
  output: {
    filename: '[name]_[contenthash:8].js',
    path: join(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [join(__dirname, '../node_modules')],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
}

module.exports = webpackconfig
