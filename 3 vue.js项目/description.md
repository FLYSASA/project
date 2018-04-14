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


---
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

> commit: [添加两个按钮](https://github.com/FLYSASA/project/commit/724783e6e5e5d841fa2bd9e8acd3419f5c306153)


#### ResumeEditor

先写基本HTML,CSS
> commit: [添加左侧导航](https://github.com/FLYSASA/project/commit/6165ac2d58f763813cc1c9ceae4f78dec98b9907)
> commit: [tab切换](https://github.com/FLYSASA/project/commit/81a1d71da6225010bc389732a2ea4ff39d913b91)

另外在写v-for时vscode会红线报错,如下:

![QQ截图20180409142159](https://i.loli.net/2018/04/09/5acb06c1ccdb4.png)

原因: vue在升级到2.2后，当在组件中使用 v-for 时， key 现在是必须的。这是ESlint的功能,对vue进行了eslint检查.那么我们就把eslint对该插件的检查关闭,在vscode中,打开`文件>首选项>设置`找到 vetur.configuration 把  `"vetur.validation.template": true`  改成`"vetur.validation.template": false,`保存,发现不报错了
解决办法: 参考-http://www.cnblogs.com/zhouyangla/p/7081077.html

然后是重点,添加SVG icon.
所有的icon可以在[这里下载](https://github.com/jirengu-inc/jrg-project-5/blob/master/resumer_assets/svg.zip)


> commit:将所有SVG文件放到 static/svg_icons/下

接下来可能有点难以理解,我们要写一个脚本（放在build文件下）,这个脚本会把所有的SVG文件拼成一个文件:

> commit: [使用脚本将所有svg拼成一个svg,原来的多个svg变成多个symbol](https://github.com/FLYSASA/project/commit/f0025fb9d0582fb1d427876f1f671be600a3b66c)

然后运行`node build/svg-symbols.js`脚本,得到`src/assets/icons.js`

> commit: [运行 node build/svg-symbols.js](https://github.com/FLYSASA/project/commit/f0025fb9d0582fb1d427876f1f671be600a3b66c)

最后将SVG Symbols插入到页面里

> commit: [将SVG插入到body内1](https://github.com/FLYSASA/project/commit/83de96cf0073f0e2eafddff9c7e05ae9b3ed2dae)

> commit:[修正](https://github.com/FLYSASA/project/commit/3c0411febb90213b43c049624a9d2d59898f734a)

添加SVG icon结束,页面效果如下: 


[QQ截图20180409151441](https://i.loli.net/2018/04/09/5acb1b27ebee7.png)

看到body下面的svg标签了吗?

![QQ截图20180412151528](https://i.loli.net/2018/04/12/5acf0a34d737e.png)

那么如何使用这些SVG icon呢?
简要说明一下,只要在页面任意地方使用
```
<svg>
  <use xlink:href="#icon-xxx"></use>
</svg>
```
就可以展示id为`icon-xxx`的图标了.

那么开始使用SVG icon吧:
> commit: [bio重命名为profile](https://github.com/FLYSASA/project/commit/152679e73c5204d6b4cacedd4b303d577fd0200b)
> commit: [将visibleItems改为config](https://github.com/FLYSASA/project/commit/c5a3d60579d0de1c2aa91d3b728baf3118af7e5c)
> commit: [使用SVG图标](https://github.com/FLYSASA/project/commit/6ce9844abe415c2ec9b399e72c19c26931f32c10)

效果: 
![QQ截图20180409154755](https://i.loli.net/2018/04/09/5acb1b3b501fa.png)

>另外: 无法在.vue文件中使用tab扩展,可以:https://segmentfault.com/q/1010000008680303?_ea=1713330


##### 1总结图标(本地symbol)引入:
1. 打开iconfont官网,选择需要的图标添加至项目,下载至本地
2. 解压后的svg_icons文件夹放在项目文件目录static下.
3. 将脚本文件`svg-symbols.js`放在build下
4. 使用命令 ` node build/svg-symbols.js`,打包后在`src/assets`里得到icons.js icons整合文件.
5. 在主组件App.vue中引入 `import icons form './assets/icons'`
6. 创建created回调:
```js
created: {
  document.body.insertAdjacentHTML('afterbegin',icons)   //插入到body下第一个标签前面
}
```
7. 使用:  
```html
<ol>
  <li v-for="(item,index) in resume.config"   
      :class="{active: item.field === selected}"
      @click="selected = item.field">   <!-- 点击赋给该图标active属性 -->
          <svg class="icon">
              <use :xlink:href="`#icon-${item.icon}`"></use>    <!-- ${}占位符 -->
          </svg> 
  </li>
</ol>
``` 

```js
data(){
  return{
    resume: {
      config: [
          { field: 'profile', icon: 'id' },
          { field: 'work history', icon: 'work' },
          { field: 'education', icon: 'book' },
          { field: 'projects', icon: 'heart' },
          { field: 'awards', icon: 'cup' },
          { field: 'contacts', icon: 'phone' }
      ]
    }
  }
}
```

8. 在主组件中引入属性:
```css
  svg.icon{            //symbol iconfont属性
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }

```

#### 2总结图标(线上symbol引入):
1. 在iconfont上将图标添加至项目
2. 生成在线链接,将链接插入到index.html: 如:
`<script src="//at.alicdn.com/t/font_623227_jvull62u1vklz0k9.js"></script>`
3. 在App.vue中插入属性:
```css
  svg.icon{            //symbol iconfont属性
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }
```
4. 写html
```html
<ol>
  <li v-for="(item,index) in resume.config"   
      :class="{active: item.field === selected}"
      @click="selected = item.field">   <!-- 点击赋给该图标active属性 -->
          <svg class="icon">
              <use :xlink:href="`#icon-${item.icon}`"></use>    <!-- ${}占位符 -->
          </svg> 
  </li>
</ol>
``` 
5. 写data:
```js
data(){
  return{
    resume: {
      config: [
          { field: 'profile', icon: 'id' },
          { field: 'work history', icon: 'work' },
          { field: 'education', icon: 'book' },
          { field: 'projects', icon: 'heart' },
          { field: 'awards', icon: 'cup' },
          { field: 'contacts', icon: 'phone' }
      ]
    }
  }
}
```

<hr>


#### 接下来完善panels: 
> commit:[显示第一个panel的内容](https://github.com/FLYSASA/project/commit/488a14d0c70e775ce4f7bc71f489ec2497406b18)

效果如下: 

![QQ截图20180409161223](https://i.loli.net/2018/04/09/5acb2077b3956.png)

然后给第二个panel加点数据看看效果:

```
'work history': [
            {company: 'AL', content: '我的第二份工作是'},
            {company: 'TX', content: '我的第一份工作是'},
          ],
```

效果令人激动:

![QQ截图20180409161537](https://i.loli.net/2018/04/09/5acb213d26bf8.png)

由于work history属性是个数组,所以我们要判断一下数据类型:

> commit: [resume属性同时支持数组和对象](https://github.com/FLYSASA/project/commit/6a5a61b2316fe7777c7c701f93f63ed22634b9ec)

效果如下: 
![Animation](https://i.loli.net/2018/04/09/5acb25a4eb7b0.gif)



###  预览功能
首先想一个问题:
> ResumePreview的数据(data)从哪来?

当然是从ResumeEditor来,对吧.

> 但是并列组件如何拿到数据呢?

方案一: 
最傻的办法是在ResumePreview里去读ResumeEditor的data.
这种办法是可以的,但是有一个[耦合性] 太高的问题

假如ResumePreview代码是这样的:
```js
export default {
  name: 'ResumePreview',
  data: function(){
     return readResumeFromResumeEditor() // 这个函数的具体实现我们不管
  }
}
```

你会发现,ResumePreview严重依赖ResumeEditor,换句话说,ResumePreview必须和ResumeEditor在一起,ResumePreview 不能从其他的地方读入 resume 数据。

这样的代码就很不优雅.

方案二:

将数据处理出来.  我们能不能把resume的数据独立出来,专门供ResumeEditor,ResumePreview甚至其它组件来使用呢? 可以.大概思路是这样:
```js
// ResumeEditor
import globalData from 'globalData'
export default {
  name: 'ResumeEditor',
  data: function(){
    return {
      selected: 'profile',
      resume: globalData.getResume()
    }
  }
}

// ResumePreview
import globalData from 'globalData'
export default {
  name: 'ResumePreview',
  data: function(){
    return {
      resume: globalData.getResume()
    }
  }
}
```

这样依赖,ResumeEditor和ResumePreview互不干涉,只是数据来自同一个地方.

ResumeEditor 改了 resume 之后，由于 ResumePreview 用的是同一个 resume，所以立马就知道 resume 变化了（Vue.js 可以监听任意一个对象的变化）。

> Tips：可以通过添加中间层来降低耦合

<hr>

## Vuex

### 全局数据源
基于方案二,我们再进一步想,为什么不把所有的数据都交给globalData来控制呢?

上文中 ResumeEditor 的 selected 属性没有交给 globalData 管理，万一另一个组件要用这个 selected 呢？所以我们还不如把所有的数据都交给 globalData 来控制。

这样,globalData就叫做**全局数据源**,管理所有的数据.

### 双向绑定 V.S 单向绑定
前面我们学过,可以用Vue.js添加双向绑定:

```
<input v-model="xxx">
```
实际上,双向绑定不是魔法,上面的代码基本等价于

```
<input :value="xxx" @input="xxx = $evevt.target.value">  //@input监听input事件
```

也就是说:
> 双向绑定 = 单向绑定 + UI事件监听

通过这个[JSBin](http://js.jirengu.com/duzo/1/edit?html,console,output),应该可以理解这一点.

#### 那么Vuex为什么推荐单向绑定呢? 

为了[控制欲]

双向绑定是很方便,因为data和页面内容是自动同步的.

但是正因为这个[自动同步],所以有些人不喜欢双向绑定.「自动同步」意味着你不知道 data 什么时候就变了（when），也不知道是谁变的（who），变成了什么也不通知你（what）。

当然你可以加一个watch来监听data的变化,但这就显得很复杂了.

单向绑定牺牲一部分的便捷性,换来更大的**控制力**

单向绑定大概的思路就是:
1. 所有的数据只有一份
2. 一旦数据变化,就去更新页面(data -> 页面  单向绑定)
3. 如果用户在页面上做了变动,那么就把变动手动收集起来(而不是自动的),合并到现有的数据中.

你会发现单向绑定的思路其实也有双向绑定的意味,只不过重点在于**不是自动的**

单向绑定还有其他优点,请看[这个知乎回答](https://www.zhihu.com/question/49964363)

#### 使用Vuex
Vuex 就是单向数据绑定的践行者之一

最好先过一遍Vuex的文档,来了解Vuex. 需要:
1. copy - run - modify文档中的例子
2. 了解五个核心概念: Store、Getters、Mutations、Actions 和 Modules

[Vuex文档](http://vuex.vuejs.org/zh-cn/installation.html)

#### 引入Vuex 运行Vuex文档中的例子

首先我们要把 Vuex 文档里最简单的例子运行在我们的页面里：
步骤:
1. 运行`npm install vuex --save`
commit : [npm install vuex --save](https://github.com/FLYSASA/project/commit/eca557614fa39692893b4f6bd85294210fa405f0)

2. 按照文档中[项目结构](https://vuex.vuejs.org/zh-cn/structure.html)部署文件目录 
新建store文件夹

3. 按照 [文档简单例子新建最简单的store](http://vuex.vuejs.org/zh-cn/getting-started.html)
commit: [改变目录结构,创建store](https://github.com/FLYSASA/project/commit/a8f59297084ea8466c2ea5b9d7fff117e8859ea6)

4. 运行例子
commit: [运行文档中的例子](https://github.com/FLYSASA/project/commit/25e7ac7d497264cf473c08d8f5458c83b0a816d8)


![Animation1](https://i.loli.net/2018/04/12/5acf367857541.gif)


## 改写data
将原有数据移动到store里
commit: [移动数据到store](https://github.com/FLYSASA/project/commit/10655107e3253b39d7561b9c5bb6fe3d91721994)

我们把selected和resume移到store里会发现tab无法切换

这是因为默认computed只能用于读数据,如果你还想写数据(比如click给selected赋值item.field),就要用到Vue的
[setter/getter功能](https://cn.vuejs.org/v2/guide/computed.html#计算-setter) .

如果想知道如何实现setter和getter,参考 [MDN 的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#一般的_Setters_和_Getters)

> commit: [使用setter让数据可写](https://github.com/FLYSASA/project/commit/a12e5ac7f2de9776856501e5f3b73d318ac2e57c)
> commit: [删除Vuex测试代码](https://github.com/FLYSASA/project/commit/45b6dc6a05b51205b1f70a9b72ecb3e4495fb3c2)

### ResumeEditor 和 ResumePreview 使用同一个store
你可以看到我们的store是放到<App/>主组件上的,所以所有组件都可以使用 `this.$store`来访问到它. (**在Vue中所有全局变量都用$开头**)

我们来试试在ResumePreview里访问resume数据.

> commit: [show resume](https://github.com/FLYSASA/project/commit/6df95210db68bfbc987ecfd09e3ebd4f2782933a)

刷新页面,resume数据全部展示:

![QQ截图20180412202526](https://i.loli.net/2018/04/12/5acf504119ffe.png)

1. 不要一次写太多代码,要小步快跑
2. 目前页面的样式错乱了,我们需要修复,千万不要等bug积累多了再修复

> commit:[使用min-width代替width]https://github.com/FLYSASA/project/commit/bec57e676940095775f9f3bc2fc9adb87bd875aa

接下来我们让ResumePreview变得完整点/好看点:

> commit: [显示简介、工作经历和毕业院校](https://github.com/FLYSASA/project/commit/50e9e4569f09ec751728b11f433a38c9c7125f03)
> commit: [获奖情况和联系方式](https://github.com/FLYSASA/project/commit/b0f9ad748ea4c680a84c228bcce9ec3dd1e4b2e8)


#### 阶段总结:
如何引入vuex并使用?
步骤:
1. 运行 `npm install vuex --save`
2. 在src下新建store(库)文件夹,在里面新建index.js
3. index.js新建内容: 参考文档:https://vuex.vuejs.org/zh-cn/state.html
```js
//引入vuex vue
import Vuex from 'vuex'  
import Vue from 'vue'

Vue.use(Vuex)   //Vuex机制从根组件将store注入到子组件必备


export default new Vuex.Store({   //输出 并创建Vuex.Store的实例
    state:{   //数据data储存在里面
      xxx:{}
    },
    //事件存储在mutations里
    mutations: {
      f1(state,payload){   //回调函数将state作为第一个参数,payload是额外参数
        state.xxx = payload  //关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
      }
    }
})
```
4. 主组件引入store. 
```js
import store from './store/index'  //引入store库

export default {
  store,                          //store作为选项注入,同时也注入到子组件
  ...
}
```

5. 子组件引入store
```js
export default {
  computed: {         //子组件获取store数据一定要放在computed计算属性里面
      变量名: {       //将数据赋给这个变量名,同时使用getter和setter让数据可读可写
        get(){
          return this.$store.state.XXX  //数据存储在全局变量store下的state里
        },
        //数据可写,value为写入值
        set(value){
          return this.$store.commit('f1',value)  //改变状态state值的唯一方法是提交mutation,在分组件中使用this.$store.commit()提交给mutation中的函数f1,然后改变state或其属性
        }
      },
      //不需要可写直接:
      变量名2(){
        return this.$store.state.XXX
      }
  }
}
```

---
预览链接: http://flysasa.top/project/3%20vue.js%E9%A1%B9%E7%9B%AE/6-vue-Resume-editor/dist/#/
源码: https://github.com/FLYSASA/project/tree/master/3%20vue.js%E9%A1%B9%E7%9B%AE/6-vue-Resume-editor

#### 此阶段问题:
在页面左边修改 resume，会发现 ResumePreview 不会自动更新


---
### 最终阶段-单向数据流

什么是单向数据流?
简单来说就是把一切双向绑定的语法都禁用,同时只在一个地方改动数据,那么留下来的就是单向数据流.


单向数据流: 
- v-model 不允许使用，因为这是双向绑定语法。
（注意，但是 v-model 配合 computed 的 get 和 set 是可以的，因为数据的操作依然是我们手动控制的，并不是自动双向绑定）
- 「所有的数据改动」必须放在 store 里完成。


#### 让panel编辑的时候在preview中同步响应

commit: [使用Vuex思想重构](https://github.com/FLYSASA/project/commit/1dd86a3d791df06631e3e3bb880e02e6640dfac5)

> 不使用v-model双向绑定.

commit: [引入object-path,使所有字段可编辑](https://github.com/FLYSASA/project/commit/cd4a508faaf4635e9285e8c6eef9aefc348b14d6)

##### 如何使用object-path?
参考: https://www.npmjs.com/package/object-path
作用: 使用路径访问深层属性.

1. `npm install object-path --save`
2. 在index.js中引入: 
```js
import objectPath from 'object-bath'

mutations:{
  updataResume(state,{path,value}){
    objectPath.set(state.resume,path,value)   //使用objectPath对象的set方法将第一个参数设置属性为path,值为value,path是个字符串
  }
}
```

3. 在input中传入参数, @input= "f1(`${item.field}.${key}`,$event.target.value)"  即可,然后在函数中作为参数如:
`f1(path,value){}`


<hr>

### 将数据保存至localStorage  

> commit: [将数据保存至localStorage](https://github.com/FLYSASA/project/commit/5fc9926118f013b34752979e5b52074081257510)

至此,不管怎么刷新页面,页面输入的数据还是不变.

#### 添加注册和登录

> commit: [点击注册按钮弹出对话框](https://github.com/FLYSASA/project/commit/851f20b464e75accafad93a302d7bbb097f98ba5)

#### 总结为什么点击父组件的按钮,子组件显示?
主组件和子组件的通信: 
- 如果是传输data,则将data变量绑定在父组件中的子组件显示标签内.
**如何绑定?**
```html
<!-- 父组件 -->
<template>
  <div id="topbar">
    <div class="wrapper">
        <span class="logo">Resumer</span>
        <div class="actions">
          <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>
          <MyDialog title="注册" :visible="signUpDialogVisible"  @close="signUpDialogVisible = false">
            我就是slot内容 
          </MyDialog>
          <a href="#" class="button">登录</a>
          <button class="button primary">保存</button>
          <button class="button">预览</button>
        </div>
    </div>
 </div>
</template>
```
在上面,父组件中的子组件标签是 `<MyDialog>`
绑定前,一定要记得在父组件的data中**声明**该属性对应的value变量初始值,负责会报错,`signUpDialogVisible undefined`
```js
//父组件
data(){
  signUpDialogVisible: true
}
```
**想要给子组件绑定属性data,需要使用 v-bind:属性名="xxx",在这里的是`visible`. 因为部署在子组件的标签内,所以子组件就能接收到.**


**如何接收?**
父组件使用`:visible="xxx"`,传递自定义 visible属性过来,值是变量`signUpDialogVisible`即true. 
子组件首先使用props接收该属性,这样父子组件变量互通,一方改变另一方也变化,完成通信:
```js
export default {
  props: ['visible','title']   //因为title不需要自定义,所以不需要使用v-bind.
}
```

**如何使用**
```html
<!-- 子组件 -->
<template>
  <div class="wrapper" v-show="visible">  <!-- 父组件传过来的visible属性对应的值决定显隐 -->
      <div class="dialog">
          <header>
              {{title}}                   <!-- 父组件传过来的title属性对应值 -->
              <span class="close" @click="close">X</span>  
          </header>
          <main>
              <slot></slot>   <!-- 在父组件中的子组件标签内 写上内容,如上面的 `我就是slot内容`会被填充到<slot>里面 -->
          </main>
      </div>
  </div>
</template>
```


- 如果是事件通信,即在子组件内部触发父组件的事件.需要使用 `this.$emit('事件名')`
如:
```js
methods: {
      close(){
          this.$emit('close')  //引号里面的close是父组件的事件,外面的close是子组件本身的close事件.
  }
```
首先决定在子组件哪个位置进行触发事件,这里是绑定在span标签上,如果点击该标签触发 `@click="close"`事件,如果想触发父组件的close事件,需要在父组件的子组件标签上绑定一个自定义监听事件. 这样才能触发,如:
```html
<!-- 主组件 -->
<MyDialog title="注册" :visible="signUpDialogVisible"  @close="signUpDialogVisible = false">
            我就是slot内容 
</MyDialog>
```
上面在父组件的子组件标签上绑定了一个 `v-on:close="signUpDialogVisible = false"` 的事件,v-on监听close, this.$emit('close')一旦被触发, 就完成赋值`signUpDialogVisible = false`,完成事件通信.

> 弄懂通信方式后,就很好实现显隐问题了.  
1. 给父组件的注册a标签绑定一个 `@click.prevent="signUpDialogVisible = true"` ,控制变量signUpDialogVisible的值(初始在data里定义为false).
2. 给父组件的子组件标签绑定一个 `:visible="signUpDialogVisible"` (传递显隐属性)  `@close="signUpDialogVisible = false"`(改变显隐属性值)
3. 给子组件外围div绑定`v-show="visible"`
4. 给子组件内部的span  关闭标签绑定  `@click="close"`

整个逻辑就是: 点击主组件注册按钮visble的值变为true >>> 子组件接收到visible属性值, v-show="true"对话框显示. >>> 子组件点击关闭标签触发this.$emit('close') >>> 父组件中将visible值重新改为false >>> 子组件 v-show="false"隐藏

<hr>

### 使用leancloud注册
1. `npm install leancloud-storage --save`  
安装Leancloud SDK https://leancloud.cn/docs/sdk_setup-js.html
2. 初始化:https://leancloud.cn/docs/sdk_setup-js.html#hash20935048
3. 在leancloud新建应用resume,进入 控制台 > 设置 > 应用 Key 来获取 App ID 以及 App Key。
```js
//初始化
import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'sbLVjiiurqmnXDdi0zBJsy35-gzGzoHsz'
var APP_KEY = 'q68Gdtw5uPzJNDvCpYijbluS'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

```


commit: [leancloud注册](https://github.com/FLYSASA/project/commit/2129cfb21d12c9741375109b384fafc3942b5531)

#### 我们总结一下leancloud注册绑定输入框的流程: 
1. 运行`npm install leancloud-storage --save` 下载依赖
2. 在src/lib(依赖库,没有的话新建一个) 新建leancloud.js文件
3. 封装配置leancloud文件,初始化:
```js
//leancloud.js
import AV from 'leancloud-storage'  //引入
//初始化,绑定自己账号的id和key
var APP_ID = 'sbLVjiiurqmnXDdi0zBJsy35-gzGzoHsz'
var APP_KEY = 'q68Gdtw5uPzJNDvCpYijbluS'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

export default AV  //输出AV对象,方便其它组件调用
```
4. 封装组件SignUpForm.vue (注册对话框),内容如下:
```html
<template>
  <div>
      <form @submit.prevent="signUp">   <!-- 将form表单的提交显式改为自定义的signUp方法 -->
          <div class="row">
              <label>用户名</label>
              <input type="text" v-model="formData.username">
          </div>
          <div class="row">
              <label>密码</label>
              <input type="password" v-model="formData.password">
          </div>
          <div class="actions">
              <input type="submit" value="提交">
          </div>
      </form>
  </div>
</template>
```

```js
import AV from '../lib/leancloud'    //引入AV
export default {
  name: 'SignUpForm',
  data(){
      return {
          formData:{          //定义formDate对象完成与input框的双向绑定
              username: '',
              password: ''
          }
      }
  },
  methods: {
    signUp(){
      let {username,password} = this.formData   //解构赋值, 将formData里的数据赋给变量 username,password
      var user = new AV.User()                  //参考https://leancloud.cn/docs/leanstorage-started-js.html#hash-814093878  
      user.setUsername(username)
      user.setPassword(password)
      user.signUp().then((loginedUser) => {   //loginedUser登录后返回的对象
              //注册成功触发父组件success事件,并给success回调函数传入参数
              this.$emit('success',{
                  username: loginedUser.attributes.username,
                  id: loginedUser.id
              })
          },(error)=>{
              alert(JSON.stringify(error))
          })
    }
  }
}
```
4. 父组件Topbar引入SignUpForm注册组件
这里用了`<slot>`将SignUpForm注册组件放在了 MyDialog组件下.
```html
<template>
  <div id="topbar">
    <div class="wrapper">
        <span class="logo">Resumer</span>
        <div class="actions">
          <span>{{user}}</span>   <!-- 从computed计算属性里获取,通过this.$store.state -->
          <!-- 点击注册按钮,@click.prevent阻止默认跳转,并将signUpDialogVisible = true, 此时visible = true,mydialog显示-->
          <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>
          <MyDialog title="注册" :visible="signUpDialogVisible"  @close="signUpDialogVisible = false">
            <!-- 登录表单 -->
            <SignUpForm @success = "login($event)"/>                   <!-- 在父组件中子组件标签里写内容的话,会放在子组件的slot标签内,如果子组件没有slot标签就会被舍弃 -->
            <!-- $event是特殊变量 这里指的是this.$emit传递的参数对象 -->
          </MyDialog>
          <a href="#" class="button">登录</a>
          <button class="button primary">保存</button>
          <button class="button">预览</button>
        </div>
    </div>
 </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
export default {
  name: "Topbar", //name作用: 1.Topbar相当于一个全局Id 2.可以不写 3.写了可以提供更好的调试信息  参见https://cn.vuejs.org/v2/api/#name
  data(){
    return {
      signUpDialogVisible: false
    }
  },
  computed: {
    user(){
      return this.$store.state.user   //主要用来在注册按钮旁边展示用户名信息
    }
  },
  components: {
    MyDialog,SignUpForm
  },
  methods: {
    //注册成功后触发父组件的登录事件
    login(user){   //user = $event
      console.log(user)
      this.signUpDialogVisible = false      //隐藏注册对话框
      this.$store.commit('setUser',user)   //改变state状态的唯一办法是提交commit,两个参数一个是 store中对应的mutations下的方法名,一个是提交载荷即参数对象
      //触发store里面的setUser方法,并传递参数user
    }
  }
};
</script>
```
> 总结流程: 用户点击注册 >>> 显示注册对话框signUpDialogVisible: true >>> 用户输入用户名和密码点击提交  >>> form表单触发自定义事件signUp()同时输入框input的值与formData对象双向绑定  >>> signUp主要是通过将用户键入的信息即formData存储到AV.User对象中 >>> 存储完后AV.User.signUp()完成注册并在返回loginedUser对象的同时触发父组件方法 `this.$emit('success',{参数对象})`,
参数对象是返回的`loginedUser对象`的两个属性 username和id  >>> 父组件触发方法success即`login($event)`  (`$event`即子组件传人的参数对象).  >>> login方法主要将this.signUpDialogVisible = false,对话框隐藏,并将子组件注册后返回的loginedUser对象的两个属性的集合,重新通过 `this.$store.commit('setUser',user)` 提交给本地store库  >>> store触发setUser方法,将传入的两个属性集合重新赋给state.user,完成更新.  >>> 父组件Topbar,通过在计算属性computed中 `user(){return this.$store.state.user }` 获取到更新后的user,然后展示到 {{user}} 页面上. 

**简化上面的流程**
- 用户点击注册按钮,输入信息,完成本地formData更新
- 将本地formData储存至AV.User云端对象上,并返回储存后的用户账户上的id和username
- 子组件通过this.$emit('success',{id,username}),触发父组件事件success
- 父组件success触发,对话框隐藏,同时将新的属性对象集合提交commit给store库.
- store库完成user对象值更新
- 父组件获取到最新的user 通过`computed: {user(){return this.$store.state.user}}`获取
- {{user}}展示在页面上

以上是我们在TodoList里做过的事情,所以每个步骤应该有个大概印象.

<hr>
一个真实的网页,应该对错误给出友好的提示:

> commit: [show errorMessage](https://github.com/FLYSASA/project/commit/b2772788586070489700471692be37ddb19ee20a)

---
> commit: [显示用户名和登出](https://github.com/FLYSASA/project/commit/a4e3245c9ed00ba3ac770e72d52c8b6502a421f8)

---
> commit: [完成登出功能](https://github.com/FLYSASA/project/commit/fe155671826d24405efa61b079e1419a51995cff)

---
> commit: [页面载入是获取已登录用户](https://github.com/FLYSASA/project/commit/3d5adad1804505d07096a2b4853d3477aa07b99d)

---
> commit: [实现登录功能](https://github.com/FLYSASA/project/commit/93af7e02ddec9779a7fb7e6fe95cdfb57ef63376)

---
> commit: [登录成功后关闭对话框,更新store](https://github.com/jirengu-inc/jrg-project-5/commit/880c89e5a38eab7f5153f2ad546c0bd6e49f05d9)

---
> commit: [登录Debug](https://github.com/FLYSASA/project/commit/79b49304e059dc8d3b75ea91245f870f8336c078)

---
> commit: [show error message](https://github.com/FLYSASA/project/commit/326b97431f915a1ed6a9b6507be7676e96a0c449)

---
### 重要bug
这个 BUG 每个使用 Vue 的人都会遇到，但可能由于不理解 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 的用法，无法「独立解决」这个 BUG

**在Vue实例里面的data选项中的对象,Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。**

绝对绝对绝对不能让 data 中的对象的任何一个属性值变为 undefined 或者 null， 原因见 https://cn.vuejs.org/v2/guide/reactivity.html

> 将一个对象传给data选项时,如果该对象某个属性一旦被设置为`undefined或null`,vue遍历到data选项的该属性时,由于值为null和undefined,vue无法使用 `Object.defineProperty`(赋予对象新属性) 将属性转为getter/setter. setter也就无法让watcher重新更新,致使使它关联的组件无法得以更新.

![示例](https://cn.vuejs.org/images/data.png)


commit: [修复bug](https://github.com/FLYSASA/project/commit/a5d19a263291889523b3823523b22869562ebdfe)

**写在data选项中的对象属性才具有响应式,由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。**

---
另外:
```js
//App.vue
export default {
  created(){
    this.$store.commit('initState',state)   //this指的是vue实例
    this.$store.commit('setUser',getAVUser())
  }
}


