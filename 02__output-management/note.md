# 管理资源

## 项目结构

> 浏览器建议安装`Octotree`扩展程序 用于查看代码，本文中将不罗列整个文件代码

```
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- print.js
    |- index.js
  |- /node_modules
```

## 说明

### HtmlWebpackPlugin

[HtmlWebpackPlugin 插件文档](https://github.com/jantimon/html-webpack-plugin#options)

`npm install --save-dev html-webpack-plugin`

HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件。

### 清理 /dist 文件夹

`npm install --save-dev clean-webpack-plugin`

```
plugins: [
  new CleanWebpackPlugin()
  // ...
],
```
 
在每次构建前清理 /dist (默认为webpack输出目录) 文件夹，这样只会生成用到的文件。clean-webpack-plugin 是一个流行的清理插件 ,让我们实现这个需求。  


### manifest

`npm install --save-dev webpack-manifest-plugin`

webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射, 通过 WebpackManifestPlugin 插件，可以将 manifest 数据提取为一个容易使用的 json 文件

> 在你的应用程序中，形如 index.html 文件、一些 bundle 和各种资源，都必须以某种方式加载和链接到应用程序，一旦被加载到浏览器中。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack 优化 之后，你精心安排的 /src 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来。

[manifest](https://webpack.docschina.org/concepts/manifest)
[缓存](https://webpack.docschina.org/guides/caching/)