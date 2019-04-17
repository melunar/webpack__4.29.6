const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // development
  // 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
  mode: 'development',
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js'
  },
  // devtool: 'source-map',
  // devtool: 'cheap-module-source-map',
  devServer: {
    // contentBase 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '代码分离',
      filename: 'index.html',
      template: path.join(__dirname, './public/index.template.html')
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // 动态模块加载（非入口） 产生的chunk
    path: path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
}