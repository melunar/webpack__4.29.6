# 开发环境

## 本文讲述如何在本地开发环境启动一个服务，便于开发

> todo

```
|- package.json
  |- webpack.config.js
  |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
```



## 说明

### mode

首先将 [mode](https://webpack.docschina.org/concepts/mode/#mode-development) 设置为 'development'，development 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。同时启用 NamedChunksPlugin 和 NamedModulesPlugin

### source-map

> 为什么需要它？  
当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 bundle.js。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。  
为了更容易地追踪 error 和 warning，JavaScript 提供了 source map 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。
<https://webpack.docschina.org/configuration/devtool>


### 开发环境启动工具

webpack 提供几种可选方式，帮助你在代码发生变化后自动编译代码：

1. webpack watch mode(webpack 观察模式)
2. webpack-dev-server（*）
3. webpack-dev-middleware（*）

#### webpack watch mode

`webpack --watch` 或者在package.json 添加script `"watch": "webpack --watch"`

启动之后，尝试修改项目代码，你会发现webpack在监听同步编译你的代码(但仅仅这个是不够优秀的，目前的配置只是实时打包了我们的代码，并没有启动一个web服务，严格意义上来说，还没有达到开发环境工具的目的)

#### webpack-dev-server

`npm install --save-dev webpack-dev-server`

> webpack-dev-server 为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能

给你的webpack添加配置项

``` javascript
devServer: {
  // 配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080
  contentBase: './dist'
}
```
[devserver-contentbase 介绍](https://webpack.docschina.org/configuration/dev-server/#devserver-contentbase)

package.json添加一个script
```json
"start": "webpack-dev-server --open"
```

在命令行中运行 `npm start`，会看到浏览器自动加载页面。如果你更改任何源文件并保存它们，web server 将在编译代码后自动重新热加载。

[webpack-dev-server配置文档](https://webpack.docschina.org/configuration/dev-server)

#### webpack-dev-middleware

`npm install --save-dev express webpack-dev-middleware`

> webpack-dev-middleware 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。 webpack-dev-server 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。下面是一个 webpack-dev-middleware 配合 express server 的示例

完善webpack配置项

``` js
output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist'),

  // 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时
  publicPath: '/'
}

```

重点：server.js

``` js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

```

启动 `node server.js` 你会看到跟webpack-dev-server一样的效果 

[webpack-dev-middleware 更多介绍](https://www.npmjs.com/package/webpack-dev-middleware)

### webpack-dev-middleware 和 webpack-dev-server 是常用的两种启动本地web server的方式