# 管理资源

## 项目结构

> 浏览器建议安装`Octotree`扩展程序 用于查看代码，本文中将不罗列整个文件代码

```

```

## 说明

### 加载css

为了在 JavaScript 模块中 import 一个 CSS 文件(`import './style.css'`)，你需要安装 `style-loader css-loader`，并在 module 配置 中添加这些 loader：
`npm install --save-dev style-loader css-loader`


### 加载 images 图像

`npm install --save-dev file-loader`

像 background 和 icon 这样的图像，要如何处理呢？使用 `file-loader`，我们可以轻松地将这些内容混合到 CSS 中

在使用 `css-loader` 时，如前所示，会使用类似过程处理你的 CSS 中的 `url('./my-image.png')`。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为 output 目录中图像的最终路径。而 html-loader 以相同的方式处理 `<img src="./my-image.png" />`

那么，像字体这样的其他资源如何处理呢？`file-loader 和 url-loader` 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。

### 加载数据

`npm install --save-dev csv-loader xml-loader`

以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。让我们处理加载这三类文件