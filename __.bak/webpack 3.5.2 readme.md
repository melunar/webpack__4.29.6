const path = require('path'); // nodeJs 自带模块path

/**
 * npm install --save-dev html-webpack-plugin
 * HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
 */
 const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * npm install clean-webpack-plugin --save-dev
 * 执行构建操作时用于清空制定文件夹
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
// process.env.NODE_ENV="'production'
// 关于生产环境的相关文档 <https://doc.webpack-china.org/guides/production/>
 module.exports = {
 	entry: {
		// 文件分离方法1: 使用 entry 选项手动分离代码
 		//app: './src/index.js',
 		//print: './src/print.js',
        app: './src/index.js',
		vendor: [
			"lodash"
		]
 	},
 	output: {
 		//filename: '[name].bundle.js',
		filename: '[name].[hash].js', // 使用chunkhash/hash命名文件 解决缓存问题,每次变动内容打包都会生成新的hash值
 		path: path.resolve(__dirname, 'dist') //path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。 ==> __dirname + '/dist'
 	},

    //devtool: 'eval-source-map',
    devtool: 'inline-source-map',
    //devtool: 'cheap-module-eval-source-map',


 	//cnpm install --save-dev webpack-dev-server
 	//webpack-dev-server 配置
	devServer: {
		contentBase: './dist',
		port: "9000",
        hot: true //热更新
	},
 	plugins: [
        // HMR 模块热替换 与webpack-dev-server hot模式结合使用: 在刷新页面的情况下更新页面
        new webpack.HotModuleReplacementPlugin(),

        // 允许同时配置多个 HtmlWebpackPlugin
	 	new HtmlWebpackPlugin({
	 		title: '首页'
            //filename: path.resolve(__dirname, 'dist') + '/main.html'
	 	}),
		// 文件分离 方法2: 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // Specify the common bundle's name.
			// CommonsChunkPlugin 默认自带打包模式 打包公共模块到common.js
			// 不可以与自定义CommonsChunkPlugin.name共同使用
		}),*/

		//将第三方库(library)提取到单独的 vendor chunk, 更好的配合浏览器缓存功能
		//热更新的速率也会大大提升 减少主js文件大小, 提升加载速度
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		// 用于生产环境,使hash值不会随意变化 一般不用吧
		// new webpack.HashedModuleIdsPlugin(),

		//提取webpack模板到runtime中 via CommonsChunkPlugin
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
    	}),
		//给打包文件加文档说明
		new webpack.BannerPlugin('webpack 3.5.2 简单demo via 郝勇 2017.08.13'),
	 	new CleanWebpackPlugin(['dist']) //每次构建清空dist
 	],
 	module: {
 		rules: [
 		{
 			test: /\.css$/,
 			use: [
 			'style-loader',
 			'css-loader'
 			]
 		},
 		{
 			test: /\.(png|svg|jpg|gif)$/,
 			use: [
 			'file-loader'
 			]
 		}
 		]
 	}
 };