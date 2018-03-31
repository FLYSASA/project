###项目流程:

前期准备:
#### 安装webpack:
`npm install webpack -g`
如果上面的指令下载速度太慢的话,运行
`npm config set registry https://registry.npm.taobao.org/ `
想要恢复原来的:
`npm config delete registry`

#### ES Modules
熟悉语法:
[import 用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
[export 用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)

#### Webpack的入门使用
run 官方实例:
[实例](https://webpack.js.org/)
1. 新建webpack-demo文件夹 `npm init` 格式化,`npm init -y`使用默认设置
2. 分别新建app.js、bar.js、page.html、webpack.config.js
3. 命令行 `webpack` (如果没有全局安装webpack无法使用)

运行结果,自动新建了一个dist文件夹
![微信截图_20180331175023](https://i.loli.net/2018/03/31/5abf5a04c5995.png)

命令行显示:
```
Hash: a0c7fbf32b3eb29a14ac
Version: webpack 4.3.0
Time: 68ms
Built at: 2018-3-31 17:31:41
    Asset      Size  Chunks             Chunk Names
bundle.js  3.54 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./app.js] 63 bytes {main} [built]
[./bar.js] 85 bytes {main} [built]

```
4.修改bar.js的内容
```js
export default function bar(){
    alert('Hello Webpack!')
}
```
重新运行`webpack`

![运行成功](https://i.loli.net/2018/03/31/5abf58b2d8f13.png)

> 注意: 上传github的时候,需要添加.gitignore文件,并且在里面加上一行`node_modules`,以防止把这个目录上传到github上.