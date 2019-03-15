const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const config = require('./config')

const app = express()
const compiler = webpack(webpackConfig)

// 告诉 express app 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.dev.assetsPublicPath
}))

app.listen(3000, () => {
  console.log('app listening on port 3000\n')
})