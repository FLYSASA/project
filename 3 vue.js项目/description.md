## Vue.js 在线简历编辑器

### 需求分析

#### 项目目标
做一个工具,用户可以用这个工具来写简历

#### 功能列表
1. 添加简历内容，包括个人信息、工作经历、学习经历、获奖情况、项目经历和联系方式。
2. 更新简历内容
3. 选择简历模板
4. 预览简历
5. 发布简历

#### 原型图
画出一个基本的图片，来描述我们的页面是什么样子：

![原型图](https://i.loli.net/2018/04/05/5ac5de54c1be1.png)

#### 分模块/分区
大概将页面分为几个模块,化整为零,分别出发

![分区](https://i.loli.net/2018/04/05/5ac5de86bf2c4.png)

每个区块的内容都不太复杂:
1. 顶栏。包含 logo 和一些按钮。
2. 编辑区。包含一组按钮和一些表单。
3. 预览区。展示 HTML，可切换模板。

然后你大概看一下每个按钮的功能，就可以开始干了！

### 初始化项目
之前了解过 webpack，但是我的项目使用 [vue-cli](https://github.com/vuejs/vue-cli) 这个工具。由于 vue-cli 其实也是用了 webpack，所以用起来不会特别陌生。

```json
> mkdir 项目名称
> cd 项目名称
> npm init        # 使用 npm init 来生成一个 package.json，方便我们添加依赖
...
Press ^C at any time to quit.
{
  "name": "resumer",
  "version": "1.0.0",
  "description": "在线简历制作工具",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "flysasa",
  "license": "ISC"
}
...
```
然后全局安装vue-cli(安装到当前目录也可以),并用vue-cli来初始化一个vue项目.(`初始化后这个文件夹里的文件将整个被替换`)
```
> npm install -g vue-cli
> vue init webpack .      #注意这里的 . 字符

? Generate project in current directory? Yes
  This will install Vue 2.x version of the template.

  For Vue 1.x use: vue init webpack#1.0

? Project name resumer
? Project description A Vue.js project
? Author frankfang <frankfang1990@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? No

   vue-cli · Generated "resumer".

> npm i
> npm run dev
```

运行完`npm run dev`,访问 http://localhost:8080/#/ .

#### 我们简化一下上面Vue.cli脚手架搭建流程,分为下面几个步骤:

1. 创建项目文件,初始化,创建package.json好安装后面需要的依赖
`npm init` 

2. 全局安装vue-cli(本地也行) 前提安装好了`webpack`(推荐本地安装)
`npm install -g vue-cli`

3. vue初始化项目,生成项目模板(.为项目名,自己随意)
`vue init webpack .`  

4. 安装依赖
`npm install`

5. 启动
`npm run dev`

> 另外最新版本移除了自动打开浏览器访问 http://localhost:8080/#/ ,如果想设置成自动打开:

找到/config/index.js文件，你会发现很多参数配置都在里面
```
// 各种设备设置信息
host: 'localhost', //主机名
port: 8080, // 端口号（默认8080）
autoOpenBrowser: false,//是否自动打开浏览器
//想让浏览器自动打开，只需将false改为true即可，为防止端口号冲突，这里也可以随意更改端口号
```

运行完后`npm run dev` 进入欢迎页: 
![微信截图_20180405170852](https://i.loli.net/2018/04/05/5ac5e7b0a1129.png)

此时webpack已经在命令行持续运行着,不要关掉它.

![微信截图_20180405170737](https://i.loli.net/2018/04/05/5ac5e7e673d77.png)

安装完后的目录树: 
![微信截图_20180405170616](https://i.loli.net/2018/04/05/5ac5e714ca8c6.png)

### 解析目录结构:
```
.
├── README.md
├── build                    # build 目录用于存放构建脚本，比如 webpack 配置文件
├── config                  # config 目录用于存放一些配置信息，比如配置打包后的 bundle 文件存放在哪里
├── index.html           # 首页
├── node_modules    
├── package.json    
├── src                       # 除了首页，其他的源代码都在 src 目录里
├── static                   # static 目录用于放置静态资源，比如 favicon.ico 文件等
└── test                     # 单元测试等代码放在 test 目录里
```

我们主要知晓源代码都放置在src里就可以了.


#### index.html
打开index.html,里面就一个div#app,但是我们发现竟然没有引用`bundle.js`

但是打开http://localhost:8080/#/ 的源代码,会发现是这样的: 
![微信截图_20180405172024](https://i.loli.net/2018/04/05/5ac5ea85c5f53.png)

竟然多了一行:
`<script type="text/javascript" src="/app.js"></script></body>`,

好吧,我们先接受这个设定,肯定是vue-cli在背后做了什么事情.

#### src/
src目录的结构如下:
```
src
├── App.vue                # App.vue 是**主组件**，后面讲什么是组件
├── assets                 # assets 用于放置代码之外的资源，比如图片、字体等
├── components       # components 用于放置主组件之外的组件，vue 组件的后缀都是 .vue
├── main.js                # JS 入口文件，浏览器执行的第一行代码在这里，所以我们先看这里
└── router                 # 路由，目前用不到
```

#### src/main.js
```js
import Vue from 'vue'
import App from './App'   //相对main.js的路径
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

main.js只是把#app替换成了`<App/>`,那么`<App/>`是什么呢?

components属性定义了App: `components: { App },` 这是[ES6 语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#属性定义),换成ES 5语法就是`components: {App:App}`,那么App到底长什么样子?

看`import App from './App'` ,说明`./App.vue`定义了App的样子:
```js
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

参考: [Vue单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html#search-query-sidebar)

**一个单文件组件包含三个根标签: `<template>``<script>``<style>`,三者分别用来表示内容,行为和样式(正交原则)**

使用单文件组件有几个注意事项:

1. <template>有且就有一个儿子标签:
```html
示例1:
<template><div></div><template>  正确
示例2:
<template><div></div><div></div><template>  会报错
示例3:
<template> 你好 </template>  会报错
```

2. `<script>`里面必须包含`export default{}`,也就是说必须默认导出一个对象,对象的属性见文档.

3. `<style>`默认只支持CSS,想要支持SCSS请看[vue-cli webpack 模板的文档](http://vuejs-templates.github.io/webpack/pre-processors.html)


### modify
我们来修改App.vue.webpack已经在watch文件了,所以改完代码,你直接切到浏览器就可以看到效果(连刷新都不用).

#### 改template和style
```js
//APP.vue
<template>
  <div>
    <p>你好</p>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  p{color:red}
</style>
```

结果: 
![微信截图_20180405225110](https://i.loli.net/2018/04/05/5ac6380812b2b.png)

#### 加个data
```js
<template>
  <div>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: {
    text: '你好'
  }
}
</script>

<style>
  p{color:red}
</style>
```

![微信截图_20180405225425](https://i.loli.net/2018/04/05/5ac638b1022d3.png)

发现没有出现`你好`,出错了:

这时候排查错误:
1. 看看命令行有没有报错
2. 看看浏览器有没有报错

命令行没报错,浏览器:
>  [Vue warn]: The "data" option should be a function that returns a per-instance value in component definitions.

报错data应该是一个function.看看单文件组件的文档,应该改成这样:
```js
<script>
export default {
  name: 'app',
  data: function(){
    return {
      text: '你好'
    }
  }
}
</script>
```
报错更奇怪了: 
![微信截图_20180405230123](https://i.loli.net/2018/04/05/5ac63ad895346.png)

原来这是ESLint插件认为我们写的代码不符合规范,意思是: 
1. 函数的圆括号前面要加一个空格
2. 花括号前面要加一个空格

我们此时有两个选择: 
1. 按照它的规范,修改源码
2. 禁用ESLint

- 如果你想折腾,就选1,把代码改成
```js
<script>
export default {
  name: 'app',
  data: function () {       //注意空格
    return {
      text: '你好'
    }
  }
}
</script>
```
此时不再报错: 

![微信截图_20180405230726](https://i.loli.net/2018/04/05/5ac63bb75e8c0.png)

- 如果不想折腾,就去`build/webpack.base.conf.js`里,修改一下设置,然后重新运行`npm run dev`. 我们还是选择后者吧...

```js
// 第43行
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
```
发现使用了EsLint, 在vscode里 `ctrl键 点击上面的useEslint`,即可定位到`config/index.js`里配置 `useEslint: true, // 改为false即可`

![微信截图_20180405231716](https://i.loli.net/2018/04/05/5ac63ece2264c.png)

或者刚开始`vue init`的时候,`Use ESLint to lint your code? (Y/n)` 这一步选no


> 注意但凡修改了`config里的文件`都需要关闭之前的`npm run dev`,重新运行.

重新运行发现不再报错,现在我们基本知道了一个组件要怎么写.


### 三分天下
我们的应用(App)含有三个部分: 顶栏、编辑区和预览区

所以我们新建三个组件.新建三个Vue文件:
`Topbar,ResumePreview,ResumeEditor`

![微信截图_20180406003022](https://i.loli.net/2018/04/06/5ac64f3d2d4e7.png)

此时页面如下：


![微信截图_20180406004240](https://i.loli.net/2018/04/06/5ac6520b71534.png)


#### 补充HTML & CSS
UI预览在这里: https://jirengu-inc.github.io/jrg-project-5/resumer_mockups/index.html

点击左侧`编辑`页面,可以看到页面标注

![微信截图_20180406082038](https://i.loli.net/2018/04/06/5ac6bd6b535b2.png)

有了标注我们就开始把大体的HTML和css写好.

设计稿总宽度是1440px,页面宽度如果不足 1440px,按比例缩小，最小缩小到 1024px,不兼容手机.

> 在于设计师交流之前,不要写样式代码.

下面是添加样式的过程:

- commit: add reset.css
新建reset.css于`assets`文件夹下.并在App.vue中引入`import './assets/reset.css'`
```css
/* reset.css */
*{margin:0; padding:0; box-sizing: border-box; }
*::after, *::before{box-sizing:border-box;}
```

- commit: add normalize.css
安装`normalize.css`依赖,并在App.vue中引入`import 'normalize.css/normalize.css'`
`npm install --save normalize.css`

- 将normalize.css和reset.css移到最前面
```js
//App.vue
import 'normalize.css/normalize.css'
import './assets/reset.css'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
```

- 添加flex布局
```html
<!-- App.vue -->
<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>
```

```css
/* App.vue*/
<style>
  .page{
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #topbar{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    height: 64px;
  }
  .page>main{
    flex-grow: 1;
    min-width: 1024px;
    max-width: 1440px;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }

  #resumeEditor{
    width: 35%;
    background: #444;
  }

  #resumePreview{
    width: 61.66667%;
    background: #777;
  }
  ```

  到目前为止效果如下:
  
   ![微信截图_20180406090238](https://i.loli.net/2018/04/06/5ac6c73923472.png)
   
   继续:
   - commit : [调节位置,背景色等](https://github.com/FLYSASA/project/commit/1f89a43264870207a0707dbd25a525d82b93691c)


   > 注意:Vue单文件组件定义的css样式优先级会高于主组件App.vue.

   然后,当我们把分辨率调到1440px以上之后,发现main并没有居中.

   ![微信截图_20180406094919](https://i.loli.net/2018/04/06/5ac6d22c22c10.png)

   修正如下:

   - commit: [centerd](https://github.com/FLYSASA/project/commit/7024b3f6e94e91ba2dd3209569fc53e5ff2969d1)


   另外:
   - commit : [topbar样式 间距等](https://github.com/FLYSASA/project/commit/ec440715c87d95f8550923e7e36da18f5bee5fc0)
 


看看页面效果:

![微信截图_20180406105521](https://i.loli.net/2018/04/06/5ac6e1e63ffeb.png)


### 预览
运行`npm run build`,生成dist文件,并在.gitignore里删掉 /dist/(vue默认不上传dist),然后上传至github.


![微信截图_20180406115203](https://i.loli.net/2018/04/06/5ac6eeed6b81c.png)

发现报错,找不到资源.这是因为没有**修改  `assetsPublicPath`**

`assetsPublicPath` : 资源的根目录,这个是通过http服务器运行的url路径。

找到config/index.js中的 `assetsPubulicPath` 改为: `assetsPubulicPath: '',`即可.

然后运行
```npm run build```

就会生成一个dist目录,dist文件夹里面的index.html即可以在github上预览的页面(**不过必须是 http 协议**)

跟往常的githubpages的预览链接不一样的是, 链接地址到 dist/即可.

我的预览链接: http://flysasa.top/project/3%20vue.js%E9%A1%B9%E7%9B%AE/6-vue-Resume-editor/dist/#/



## Resumer-editor2

UI预览在这里: https://jirengu-inc.github.io/jrg-project-5/resumer_mockups/index.html

这次直接使用上面的resumer,不再新建项目.

上面我们把页面分为三大模块:

1. Topbar
2. ResumeEditor 
3. ReseumePreview

今天我们逐个完善.

### LESS/SCSS/Stylus
之前我们写的样式都是css,现在我们想加上css预处理怎么办? 很简单,抄[vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)的文档[Pre-Processors](http://vuejs-templates.github.io/webpack/pre-processors.html)章节的[示例](http://vuejs-templates.github.io/webpack/pre-processors.html)即可:

为了让node-sass顺利安装,首先在命令行运行:
```
export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"
```
然后
```
npm install --save sass-loader node-sass
```

> commit: [add](https://github.com/FLYSASA/project/commit/daf282a805f6ac8571d11d8f4c77fec4b5f010e8)

为什么要安装`sass-loader node-sass`呢? 因为不装就报错了,你可以先试试不装`sass-loader node-sass`会怎样.

> 你见的bug越多, 你改bug就改的越快.

上面用的是scss,如果你喜欢Stylus/LESS,请自行摸索.

同理,如果你要使用其它预编译的HTML或JS,都可以做到,看上面的文档操作.

### 更多HTML和CSS

#### Topbar





