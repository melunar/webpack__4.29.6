const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // development
  // 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // contentBase 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
      filename: 'index.html',
      template: path.join(__dirname, './public/index.template.html')
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath 指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。
    // publicPath: '/'
  }
}