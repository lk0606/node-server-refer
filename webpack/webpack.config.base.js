const { join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
// import { join } from 'path'
// import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const output = join(__dirname, '../dist')
console.log('output :>> ', output);
const webpackconfig = {
  target: 'node',
  mode: 'none',
  entry: {
    app: join(__dirname, '../app/index.js'),
  },
  resolve: {
    modules: [join(__dirname, '../app'), 'node_modules'],
    extensions: ['.js', '.json'],
  },
  output: {
    filename: '[name].bundle.js',
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
    // new CleanWebpackPlugin(),
  ],
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
}

module.exports = webpackconfig
