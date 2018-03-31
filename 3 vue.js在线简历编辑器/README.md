### 项目流程:

前期准备:
## webpack
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


-------------------------------------

## Vue.js
#### 安装
官网安装教程:
英文: https://vuejs.org/v2/guide/installation.html#NPM
中文: https://cn.vuejs.org/v2/guide/installation.html#NPM

命令行工具进入`2 vue-demo`
安装运行: `npm install vue`

[按照文档](https://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建),我们需要添加webpack配置(下面是修改后的webpack.config.js):
```js
//webpack.config.js
const path = require('path')
module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
           'vue$': 'vue/dist/vue.common.js' //commonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。这些打包工具的默认文件 (pkg.main) 是只包含运行时的 CommonJS 版本 (vue.runtime.common.js)。
        }
    }
}
```
**注意**:一般安装vue的时候控制台会有很多警告,如下:
```
npm http request GET https://registry.npm.taobao.org/vue
npm http 200 https://registry.npm.taobao.org/vue
/Users/frank/jrg/jrg-project-5/step-2
├── vue@2.1.8
└── UNMET PEER DEPENDENCY webpack@1 || 2 || ^2.1.0-beta || ^2.2.0-rc

npm WARN enoent ENOENT: no such file or directory, open '/Users/frank/jrg/jrg-project-5/step-2/package.json'
npm WARN babel-loader@6.2.10 requires a peer of webpack@1 || 2 || ^2.1.0-beta || ^2.2.0-rc but none was installed.
npm WARN step-2 No description
npm WARN step-2 No repository field.
npm WARN step-2 No README data
npm WARN step-2 No license field.

```
最后四行警告没有description、repository field、README data 和 license field。
要解决这个问题,我们必须要有如下几个文件:
- package.json  (上面的例子已创建可忽略,这里是针对没有创建的情况)
- README.md
1. package.json
使用`npm init`可以创建一个初始的`package.json`,npm 会问你很多问题，方便起见，我们先不回答，一路回车就行.

这时候`package.json`就创建好了,你需要
1. 把里面的description改一下
2. 如果你这个目录有对应的git远程仓库的话,你也可以加上repository字段,如下:
```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "A vue.js demo",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.5.16"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/FLYSASA/xxx.git"
  }
}
```



2. README.md
这个文件对于开源项目来说非常重要,用于做项目说明等.

创建好上面两个文件夹后会发现,警告变少了.如:
```
 # npm i vue
 npm http request GET https://registry.npm.taobao.org/vue
 npm http 304 https://registry.npm.taobao.org/vue
 step-2@1.0.0 /Users/frank/jrg/jrg-project-5/step-2
 ├── vue@2.1.8
 └── UNMET PEER DEPENDENCY webpack@1 || 2 || ^2.1.0-beta || ^2.2.0-rc

 npm WARN babel-loader@6.2.10 requires a peer of webpack@1 || 2 || ^2.1.0-beta || ^2.2.0-rc but none was installed.
 npm WARN step-2@1.0.0 No repository field.
```

### 如果出现警告babel-loader@6.2.10 requires a peer of webpack
上个webpack阶段,全局安装了webpack`npm i -g webpack`
同样,任何想要启动你的项目的人,都必须全局安装webpack,如果他忘了安装,那么这个项目根本就无法运行.这就很麻烦了,你需要在README.md里警告其他人一定要安装webpack才行.

而npm想了另一个方法来解决这个麻烦,把你依赖的命令都声明在package.json里,如:
```
npm i --save webpack babel-loader babel-core babel-preset-es2015 babel-preset-react
```
运行上面的命令后,我们依赖的所有包都会被安装,同时package.json的`dependencies`字段,会记录这些包的名字和版本,就像这样:
```
// 这是 package.json 文件的内容
{
  省略...
  "main": "app.js",
  "dependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "vue": "^2.5.16",
    "webpack": "^4.4.1"
  },
  省略...
}
```

#### 这样做有什么好处呢?
1. 别人`git clone`你的项目后,只需要运行`npm i`就可以安装你`dependencies`里面指定的包
2. 不需要全局安装webpack了,转而使用`./node_modules/.bin/webpack`这个文件作为webpack命令,命令就是文件

我们来try一下:
运行`./node_modules/.bin/webpack`
这时候出现:
```
The CLI moved into a separate package: webpack-cli
Would you like to install webpack-cli? (That will run npm install -D webpack-cli) (yes/NO)
```
这是因为webpack 4 版本将cli分离出来,需要单独安装,这里输入`yes`即可安装.
安装完时,控制台显示
```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment .
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```
问webpack的设置模式(webpack4版本 分为development和production和none模式)
这三个mode的区别在于:
- production不支持监听,侧重于打包后的文件大小
- development侧重于构建的速度
- none 禁用任何默认行为

如果想更改模式如下(https://webpack.js.org/concepts/):
```js
//webpack.config.js
module.exports = {
    mode: "development",
    //...
}
```
模式设置好后,重新运行`./node_modules/.bin/webpack`
出现打包成功:
```
Hash: e4229eb03a209a085afe
Version: webpack 4.4.1
Time: 80ms
Built at: 2018-3-31 19:23:18
    Asset      Size  Chunks             Chunk Names
bundle.js  3.57 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./app.js] 63 bytes {main} [built]
[./bar.js] 112 bytes {main} [built]

```
然后你就可以卸载全局安装的webpack了,不过没必要卸载

### 初步使用Vue
1. copy
参照vue官网的例子: https://cn.vuejs.org/v2/guide/#起步

重设page.html文件如下:
```html
<!-- page.html -->
<html>
    <head></head>
    <body>
        <div id="app">
        {{ message }}
        </div>

        <script src="./dist/bundle.js"></script> <!-- 注意bundle.js的引用路径，否则会报错 -->
    </body>
</html>
```

重设app.js如下
```js
//app.js
import bar from './bar'

var app = new Vue({
    el: '#app',
    data: {
        message: "Hello Vue!"
    }
})
```
运行`webpack`,发现:

![](https://i.loli.net/2018/03/31/5abf750448e82.png)

`vue is not defined.`
这是因为我们没有在app.js中引入vue模块,我们仿照`import bar from './bar'`重设app.js
```js
import bar from './bar'
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
```
然后运行`webpack`,刷新page.html

![](https://i.loli.net/2018/03/31/5abf7681ebb36.png)
完美运行.

2. modify
解析上面的例子
```html
<div id="app">
    {{ message }}
</div>   
```

```js
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
    }
})
```

1. div里的 {{message}}怎么变成了Hello Vue!
看来`hello Vue!`和`message`有某种对应关系,我们把Hello Vue!改成Hello miao~,
改完保存,运行`webpack`

![](https://i.loli.net/2018/03/31/5abfa3834ac67.png)

看来我们的猜测是对的,data和message与页面中的{{message}}存在绑定关系.
接下来我们可以继续猜测,然后通过modify类验证.

2. `div id="app"`与`el: #app`有对应关系,那么我们试着把div的id="app"改成id="miaomiao".
> 注意:改Html是不需要运行`webpack`的,然后我们直接刷新page.html试试:

![](https://i.loli.net/2018/03/31/5abfa4a092529.png)

果然报错,找不到#app,说明我们的猜测正确.

你还可以继续猜,然后modify,比如data,改el等.

> 注意: 每次改完js都要运行webpack重新打包.

-----------------------------------------------


### Vue 待办事项小应用项目实践
学会一个框架的最好办法--做毁一个项目

首先我们新建项目目录:
1. 命令行进入文件夹2-vue-demo的上级目录
2. `mkdir 3-vue-demo`
3. `cp -r 2-vue-demo 3-vue-demo1`  //将2-vue-demo里的东西拷贝到3-vue-demo1

我们的目标只有一个,就是搞清楚怎样用Vue.js进行开发.

#### 需求
这个项目的英文名暂定为Todo,它有以下功能:
- 用户可以新建一个待办事项
- 用户可以删除一个待办事项
- 用户可以将一个待办事项标记为已完成
- 用户刷新页面之后,待办事项还在

### 开始
首先我们用Html描绘一下我们的界面
```html
<!-- page.html -->
<html>
  <head>
    <meta charset=utf-8>
  </head>
  <body>
    <div id="app">
      <div class="newTask">
        <input type="text">
      </div>
      <ol class="todos">
      </ol>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```
1. meta要加上,不然出现中文就乱码了
2. 加一个`div#app`,用于给Vue初始化
3. `div.newTask > input`用于让用户输入待办的内容