## 项目结构

> 浏览器建议安装`Octotree`扩展程序 用于查看代码，本文中将不罗列整个文件代码

```
|- package.json
|- webpack.config.js
|- /dist
  |- main.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

## 说明

### 模块

ES2015 中的 import 和 export 语句已经被标准化，并且 多数浏览器已经能够支持。一些旧版本浏览器虽然无法支持它们，但是通过 webpack 开箱即用的模块支持，我们也可以使用这些ES2015 模块标准。

### 配置文件

在 webpack v4 中，可以无须任何配置，`npx webpack` 默认以`src/index.js` 为entry打包项目，并输出到 `dist/main.js`；然而大多数项目会需要很复杂的设置，如 `webpack.config.js`

### npm scripts

有了webpack配置文件，可以在package.json添加npm命令 `"build": "webpack"`，可以使用 `npm run build ` 命令，来替代我们之前使用的 `npx webpack` 命令