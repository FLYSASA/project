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
    "url": "https://github.com/FLYSASA/xxx.git"
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


### Vue 待办事项小应用项目实践 3-vue-demo1
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
      <ol class="todos"></ol>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```
1. meta要加上,不然出现中文就乱码了
2. 加一个`div#app`,用于给Vue初始化
3. `div.newTask > input`用于让用户输入待办的内容
4. `ol.todos`用于容纳所有待办,每个待办就是一个`li`

#### 添加待办
接下来我们做第一个需求,新建待办

做之前想好流程:
1. 用户输入待办内容
2. 用户按下回车
3. 新的待办出现在`ol.todos`里

```js
//app.js
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    }
})
```
我们用todoList数组作为所有待办事项的容器,newTask作为input的值.

#### 疑问:为什么要有data?
这里出现了一个令我们费解的地方--为什么我们要将DOM与JS变量(data)对应起来.

这里如果我们用jQuery来写,之间在input的键盘事件中取出`input.value`,构造一个`<li></li>`,插入到`ol.todos`就完了.

这就是框架和库的区别. jQuery作为一个库,你想怎么用就怎么用,但是你在使用一个框架的时候,有很多**指导思想**是你需要遵循的,Vue的知道思想之一就是 **尽量不要操作DOM** ,因为这个框架会帮你操作DOM.

#### 绑定数据
```html
<div class="newTask">
    <input type="text" v-model="newTodo">
</div>
```

这一句将`input.value`与`data.newTodo`绑定起来,而且是双向的:
1. 只要`input.value`被用户改了,`data.newTodo`就会变成一样的值;
2. 只要`data.newTodo`被js改了,`input.value`就会变成一样的值

如何验证呢?
首先我们验证在js里改变`newTodo`,`input.value`就会变:
```js
//app.js
import Vue from 'vue'
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function(){
        let i = 0
        setInterval (()=>{
            this.newTodo = i //this.newTodo就是data.newTodo,实际上 this.newTodo 是 data.newTodo 的代理
            i += 1
        },1000)
    }
})
```
运行`webpack`,打开`page.html`,可以看到input的值自己变化着.

> Tips: 如果你不想每次都运行`webpack`,那么你可以新开一个命令行窗口,运行`webpack --watch`,那么`webpack`就会在每次js文件变化时自动重新运行.

接下来验证input.value改变会导致data.newTodo变化:
```js
//app.js
import Vue from 'vue'
var app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todoList: []
    },
    created: function(){
        setInterval(() => {
            console.log(this.newTodo)
        },1000)
    }
})
```
F12打开console,然后在input里输入以下字符试试.

![微信截图_20180401080938](https://i.loli.net/2018/04/01/5ac02370a2813.png)


以上就是**双向绑定**.

#### 绑定事件
我们需要在用户敲击 <kbd>回车</kbd> 的时候，在data.todoList里新建一个对象.

如何监听用户的键盘事件呢?请查看 https://cn.vuejs.org/v2/guide/events.html

看完这一节后,改写app.js
```js
//app.js
import Vue from 'vue'
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    methods: {
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,
                createAt: new Date()
            })
            console.log(this.todoList)
        }
    }
})
```
> 注意methods是一个对象,里面是属性和方法,属性对应的是html里面定义的方法名,如@keyup.enter="addTo"中的`addTo`

```html
<!-- page.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8>
</head>
<body>
    <div id="app">
        <div class="newTask">
            <input type="text" v-model="newTodo"  @keyup.enter="addTodo">  <!-- 给input绑定键盘输入enter触发addTodo事件 -->
        </div>
        <ol class="todos"></ol>
    </div>
    <script src="./dist/bundle.js"></script>
</body>

</html>
```
> 这里的`@keyup.enter="addTo"`是 `v-on: keyup.enter="addTo"`的缩写,意思是监听键盘输入enter触发addTo函数. 其中`keyup`是键盘事件.`.enter`是事件修饰符,是由点开头的指令后缀来表示的. 

![](https://i.loli.net/2018/04/01/5ac05ea0b8db2.png)

### 展示新待办
虽然data.todoList已经含有一个新的项目了,但是页面却没有展示.
根据 https://cn.vuejs.org/v2/guide/list.html 写出下面代码

```html
<!-- page.html -->
<html>
<head>
    <meta charset=utf-8>
</head>
<body>
    <div id="app">
        <div class="newTask">
            <input type="text" v-model="newTodo" @keyup.enter="addTodo">
        </div>
        <ol class="todos">
            <li v-for="todo in todoList">
                {{ todo.title }}
            </li>
        </ol>
    </div>  
    <script src="./dist/bundle.js"></script>
</body>
</html>
```

重新刷新页面,在input里输入一些字符,回车.新增成功:

> 注意: ol一定要放在`div#app`里面,否则无效. 这里用到了列表渲染,用v-for把一个数组遍历,然后将数组里的每个元素的title属性列举出来,使用`{{todo.title}}`的结构.

![](https://i.loli.net/2018/04/01/5ac06450aefcf.png)

> 这里我们思考一下,vue data里面的数据,可以在html中div#app范围内任何指定位置展示,它是一个div#app范围内的数据集合.而不是局限于某一个div内部.当我们想展示某个data时,只需要在那个指定位置写上{{data里数据名}}.

> 另外method里面可以处理这些data.

#### 优化
按照正常人的逻辑,添加成功后,input的值应该清空,于是我们改写app.js:
```js
//app.js
methods: {
    addTodo: function(){
        this.todoList.push({
            title: this.newTodo,
            createrAt: new Date()
        })
        this.newTodo = '' //变为空
    }
}
```
刷新页面:
![微信截图_20180401132008](https://i.loli.net/2018/04/01/5ac06c275238a.png)

### 标记已完成

思路:
1. 给每一个todo添加一个done属性
2. 给每一个`<li>`里面添加一个checkbox
3. 参考https://cn.vuejs.org/v2/guide/forms.html#复选框 ,将done和checkbox双向绑定

代码如下:
```js
//app.js
methods: {
    addTodo: function(){
        this.todoList.push({
            title: this.newTodo,   //数组todoList push里面的属性都是todo的
            createAt: new Date(),
            done: false, //添加一个done属性
        })
        this.newTodo = ''
    }
}
```

```html
<!-- page.html -->
<div id="app">
        <div class="newTask">
            <input type="text" v-model="newTodo" @keyup.enter="addTodo">
        </div>
        <ol class="todos">
            <li v-for="todo in todoList">
               <input type="checkbox" v-model= "todo.done">{{todo.title}}   

               <span v-if="todo.done">已完成</span>
               <span v-else></span>
            </li>
        </ol>
    </div>  
```

> `input type="cheackbox"`是复选框类型,在复选框中将`v-motal`设置为布尔值,false则不勾选,true则勾选.此处在初始状态(即按下enter键)时todo.done为false,不勾选. 当用户主动勾选上复选框的时候,`v-motal ="true"`即为勾选态,即此时`todo.done="true"`. 此时`span v-if="true"` 则会显示`已完成`.

效果如下:

![](https://i.loli.net/2018/04/01/5ac07b73e8872.png)

### 删除待办

思路: 
1. 在每一项后面添加一个删除按钮
2. 点击按钮则从 `data.todoList`中删除该项

```js
//app.js
methods: {
    addTodo: function(){
        this.todoList.push({
            title: this.newTodo,
            createAt: new Date(),
            done: false
        })
        this.newTodo = ''
    },
    removeTodo: function(todo){
        let index = this.todoList.indexOf(todo)  //Array.prototype.indexOf是ES5新加的API
        this.todoList.splice(index,1)  //index是起点,1是删除一个
    }
}
```

```html
<!-- page.html -->
<div id="app">
        <div class="newTask">
            <input type="text" v-model="newTodo" @keyup.enter="addTodo">
        </div>
        <ol class="todos">
            <li v-for="todo in todoList">
              <input type="checkbox" v-model="todo.done">{{todo.title}}

              <span v-if="todo.done">已完成</span>
              <span v-else></span>

              <button @click="removeTodo(todo)">X</button>  <!-- todo即此时正遍历的这个 -->
            </li>
        </ol>

    </div>  
```
效果:
![Animation0](https://i.loli.net/2018/04/01/5ac0858b800e6.gif)

> 小结: 在html的li中`v-for="todo in todoList"`,虽然html结构上只有一个li,但是实际上每输入数据按下enter便创建了一个li,只是没有在html中展现出来.注意这个v-for是加在li上,而不是父容器ol上,另外需要注意的是当在methods中使用data里的数据时,需要使用 `this.XX`


### 保存待办事项
我们每次刷新页面,待办就没了
这是我们这些代码都保存在内容里,而内存是无法持久的.所以我们选择保存在localStorage中.

思路:
1. 在用户关闭页面前,讲数据保存在localStorage里
2. 在用户进入页面后,立刻读取localStorage
参考: 
onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
localStorage 文档: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
Storage.setItem 文档:https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem
代码如下:
```js
//app.js
var app = new Vue({
    el: "#app",
    data: {
        newTodo: "",
        todoList: []
    },
    created: function(){
        window.onbeforeunload = (() => {   //在关闭页面之前,也可以是刷新前
            let dataString = JSON.stringify(this.todoList)    //将数组JSON字符串化并保存在变量dataString里
            window.localStorage.setItem('myTodos',dataString)  //数据存储在 localStorage 是无期限的,setItem('键名',值),将数据储存在window.localStorage里.
        })

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []  //如果有oldDdata则赋值给this.todoList否则为空数组.
    },
    methods: {
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,
                createAt: new Date(),
                done: false
            })
        },
        removeTodo: function(todo){
            const index = this.todoList.indexOf(todo)
            this.todoList.splice(index,1)
        }
    }
})
```

> 关于为什么要先将数据JSON化,再存储到localStorage里面,是**因为DOM的存储机制是通过存储字符串类型的键/值对,来提供一种安全的存取方式,这个附加功能目标是提供一个全面的,可以用来创建交互式应用程序的方法** 参考: https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/Storage.

综上:存储在任何storage里的数据不能是对象(数组也是对象),只能是**字符串**,使用浏览器自身提供的 JSON 解析和序列化方法来存取对象是比较好的，也是比较常见的方法。清除所有缓存`localStorage.clear()`.参考: https://www.cnblogs.com/xiaojingyuan/p/5757975.html.
或者利用浏览器关闭事件清除缓存:
```js
window.onunload=function(){
    localStorage.clear();
}
```
> `JSON.stringify()` 返回与指定值对应的**JSON字符串**
> `JSON.parse()`  解析JSON字符串并返回**对应值**
> 另外需要注意的是`this.todoList = oldData || []`,一定要有`|| []`,因为如果刚开始用户打开页面时不存在oldData的,后面使用数组push的方法,由于`this.todoList`指代不明会报错

由于我们只涉及数据的变化,所以page.html不变.


将我们上面的demo放到github上预览:
http://flysasa.top/project/3%20vue.js%E5%9C%A8%E7%BA%BF%E7%AE%80%E5%8E%86%E7%BC%96%E8%BE%91%E5%99%A8/3-vue-demo1/page.html

> 由于放到github-page上网速原因,加载可能会出现{{}}标记.如果不想让用户看到这些,可以参考:  https://cn.vuejs.org/v2/api/#v-cloak

--------------------------------
### 无后台应用 4-vue-demo2
#### 我们需要一台服务器吗?
上个实例中,我们的数据存在localStorage中,这样有很多弊端:

1. 如果用户清空缓存,那么todoList就没了
2. 如果用户换一台电脑,那么todoList也看不见了

所以我们是不是应该买一台服务器来存所有用户的数据?

可以但是服务器是要钱的,我们现在没必要花这个钱.

#### No Backend(无后台)
没有服务器能不能存数据呢?
答案是: **不能**,但是又**能**

说**不能**使因为,无论如何我们都需要一个地方存数据
数**能**是因为我们不要自己买服务器

这次我们使用**LeanCloud**的免费服务来存储我们的所有数据.

#### 创建LeanCloud账户
去https://leancloud.cn/创建一个账户.
创建成功后,你需要验证你的邮箱,否则无法创建应用.

#### 创建resumer应用:
如下图:
![](https://i.loli.net/2018/04/01/5ac0edf7028e6.png)
创建成功后就放在那里,因为接下来我们要安装LeanCloud的「[JavaScript SDK 文档](https://leancloud.cn/docs/sdk_setup-js.html)」来开发登录、注册功能

### 登录和注册
首先还是用html把界面做出来

#### 页面分区
目前我们的页面的结构是
`div#app > div.newTask > ol.todos`

我们要改成
```html
div#app
    section#signInAndSignUp
    section#todo
        div.newTask + ol.todos
```

最终结果是:
```html
 <div id="app">
        <section id="signInAndSignUp">
            <div>
                <label><input type="radio" name="type" value="signup">注册</label>
                <label><input type="radio" name="type" value="login">登入</label>
            </div>
            <div class="signup">
                <form>
                    <div class="formRow">
                        用户名<input type="text">
                    </div>
                    <div class="formRow">
                        密码<input type="password">
                    </div>
                    <div class="formActions">
                        <input type="submit" value="注册">
                    </div>
                </form>
            </div>
            <div class="login">
                <form>
                    <div class="formRow">
                        用户名<input type="text">
                    </div>
                    <div class="formRow">
                        密码<input type="password">
                    </div>
                    <div class="formActions">
                        <input type="submit" value="登入">
                    </div>
                 </form>
            </div>
        </section> 

        <section id="todo">
                <div class="newTask">
                    <input type="text" v-model="newTodo" @keyup.enter="addTodo">
                </div>
                <ol class="todos">
                    <li v-cloak v-for="todo in todoList">
                        <input type="checkbox" v-model="todo.done">{{todo.title}} {{todo.createAt}}    
                        <span class="done" v-if="todo.done">已完成</span>
                        <span v-else></span>        
                        <button @click="removeTodo(todo)">X</button>  <!-- todo即此时正遍历的这个 -->
                    </li>
                </ol>
        </section>
    </div>  
```
![](https://i.loli.net/2018/04/01/5ac101a5b27f0.png)

#### Tab切换
我们希望:
1. 用户点击「〇注册」这个 radio button 的时候显示注册表单
2. 用户点击「〇登入」这个 radio button 的时候显示登入表单
3. 默认显示注册表单

所以我们需要加一个变量,叫做`actionType`,它有两个取值: 'signup'和login,都是字符串
```js
...
el: '#app',
data: {
    actionType: 'signup',
}
...
```
然后将actionType与radio button绑定(使用v-model):
```html
<div>
    <label><input type="radio" name="type" value="signup" v-model="actionType">注册</label>
    <label><input type="radio" name="type" value="login" v-model="actionType">登入</label>
</div>
```
最后让两个表单根据actionType来显示和隐藏(注意单引号):
```html
<div class="signup" v-if="actionType=='signup'">
    <form>
        <div class="formRow">
            用户名<input type="text">
        </div>
        <div class="formRow">
            密码<input type="password">
        </div>
        <div class="formActions">
            <input type="submit" value="注册">
        </div>
    </form>
</div>
<div class="login" v-if="actionType=='login'">
    <form>
        <div class="formRow">
            用户名<input type="text">
        </div>
        <div class="formRow">
            密码<input type="password">
        </div>
        <div class="formActions">
            <input type="submit" value="登入">
        </div>
        </form>
</div>
```
这样一来,用户点击radio button时就会改变actionType的值(在单选框中v-model必须保持一致,value值不一样,当点选不同radio的时候,v-model的值会替换成不同value值),actionType的值一变,两个表单就会一个隐藏一个现实.

#### 注册
要实现注册功能,首先我们要用数据来表达表单里的每个字段.
```js
data: {
    actionType: 'signup',
    formData: {
        username: '',
        passwird: ''
    }
}
```

然后将input与数据绑定起来,另外还要绑定form的submit事件:
```html
//page.html
<div class="signUp" v-if="actionType === 'signUp'">
    <form @submit.prevent=signUp> <!--👈-->
        <div class="formRow">
          用户名<input type="text" v-model="formData.username"> <!--👈-->
        </div>
        <div class="formRow">
          密码<input type="password" v-model="formData.password"> <!--👈-->
        </div>
        <div class="formActions">
          <input type="submit" value="注册">
        </div>
    </form>
</div>
```

> 注意js修改后用webpack重新打包

接下来我们来完善signup的逻辑,在写代码之前,我们需要阅读leanCloud的文档

1. 安装 Leancloud SDK
https://leancloud.cn/docs/sdk_setup-js.html
`npm install leanclound-storage --save`

2. 初始化
https://leancloud.cn/docs/sdk_setup-js.html#hash20935048

进入 控制台 > 设置 > 应用 Key 来获取 App ID 以及 App Key。

```js
//app.js

import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'sbLVjiiurqmnXDdi0zBJsy35-gzGzoHsz'
var APP_KEY = 'q68Gdtw5uPzJNDvCpYijbluS'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

var app = new Vue({
    ...
```   

3. 验证leancloud SDK安装成功
https://leancloud.cn/docs/sdk_setup-js.html#hash1262261
在项目中编写如下测试代码:
```js
...
AV.init({
   appId: APP_ID,
   appKey: APP_KEY
});
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})

var app = new Vue(){
    ...
}
```
刷新page.html后看到:
![](https://i.loli.net/2018/04/02/5ac1d2b030bc7.png)

然后打开 控制台 > 存储 > 数据 > TestObject，如果看到如下内容，说明 SDK 已经正确地执行了上述代码，安装完毕。

![](https://i.loli.net/2018/04/02/5ac1d30c3a4f7.png)


如果可以用AV对象了,然后把上面的验证代码删掉.

4. 接下来我们看leancloud [关于注册的文档](https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码注册) ,可以使用我们的「copy-run-modify」套路。按照文档的例子，我们写出这样的代码：

```js
//app.js
methods: {
    addTodo: function(){
      ...
    },
    removeTodo: function(todo){
      ...
    },
    signUp: function () {
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then(function (loginedUser) {
        console.log(loginedUser);
      }, function (error) {
      });
    }
  }
```

刷新页面,我们选择注册,然后用户名填入「123123」，密码填入「123123」，先别急着提交，打开开发者工具，切到 Network，然后提交：

![微信截图_20180402151043](https://i.loli.net/2018/04/02/5ac1d78f8ad30.png)

你会发现发了两个请求到leancloud的服务器,这两个请求就是向leancloud的服务器存入用户名和密码.
然后再切换到console,你会看到打印出的loginedUser

![微信截图_20180402151415](https://i.loli.net/2018/04/02/5ac1d851d75de.png)

这里我们只关注它的三个属性: attributes,createdAt,id

其中attributes就是我们传给数据库的username(我们不是还传了一个password吗? 服务器是不会把passworad传给前端的)
createAt是这个数据创建的时间,id是用户的id,也是我们区别用户的唯一凭据.

好了,到此为止,我们的注册功能已经做好了.是不是很简单.

#### 去数据库看看这个用户

你到LeanCloud的[控制面板](https://leancloud.cn/dashboard/data.html?appid=sbLVjiiurqmnXDdi0zBJsy35-gzGzoHsz#/_User) 点击存储,然后点击[_use]就能看到这个用户的数据了:

![](https://i.loli.net/2018/04/02/5ac1dc91cbc52.png)


#### 登入
注册做完了接下来是登入,步骤也差不多
首先绑定数据,我们复用注册的formData这个数据,因为
1. 字段相同,都是username和password
2. 这样一来用户切换登录注册的时候,已输入的数据就不需要再输入一遍
3. 当然你想用另一个数据formData2也行
```js
    <div class="login" v-if="actionType === 'login'"> 
        <form @submit.prevent="login">  <!--👈-->
            <div class="formRow">
            用户名<input type="text" v-model="formData.username"> <!--👈-->
            </div>
            <div class="formRow">
            密码<input type="password" v-model="formData.password"> <!--👈-->
            </div>
            <div class="formActions">
            <input type="submit" value="登入">
            </div>
        </form>
    </div>
```

然后看一下[leancloud文档](https://leancloud.cn/docs/leanstorage_guide-js.html#hash964666),添加login方法:
```js
login: function({
    AV.User.logIn(this.formData.username,this.formData.password).then(function(loginedUser){
        console.log(loginedUser)
    },function(error){})
})
```

接下来刷新page.html,选择`登入`,输入用户名「123123」，密码「123123」。
观察network 和 console,会得到跟注册类似的结果.

好了登录功能就完成了.

### 登录前后
我们希望
- 登录之前,不显示section#todo,显示section#section#signInAndSignUp
- 登录之后，显示 section#todo，不显示 section#signInAndSignUp

那么我们如何判断用户是否已登录?

leancloud文档说AV.User.current()可以获取当前已登录的用户.那么我们这么做:

```js
//app.js
data: {
    ...
    todoList: [],
    currentUser: null,
}
...
 signUp: function () {
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => { // 👈，将 function 改成箭头函数，方便使用 this
        this.currentUser = this.getCurrentUser() // 👈
      }, (error) => {
        alert('注册失败') // 👈
      });
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => { // 👈
        this.currentUser = this.getCurrentUser() // 👈
      }, function (error) {
        alert('登录失败') // 👈
      });
    },
    getCurrentUser: function () { // 👈
      let {id, createdAt, attributes: {username}} = AV.User.current()
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      return {id, username, createdAt} // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0
    }

```

```html
<!-- page.html -->
<section id="signInAndSignUp" v-if="!currentUser">
...
<section id="todo" v-if="currentUser">
```
然后刷新page.html,登录之后,登录表单就不见了.

#### 其他功能
##### 添加登出功能:
```js
//app.js
...
logout: function(){         //登出功能
    AV.User.logout()
    this.currentUser = null
    window.location.reload()   //相当于页面刷新按钮
}
...
```

```html
<!-- html -->
<section id="todo" v-if="currentUser">
    <p><button @click="logout">登出</button></p>   <!-- 登出按钮 -->
    <div class="newTask">
        <input type="text" v-model="newTodo" @keyup.enter="addTodo">
    </div>
    <ol class="todos">
        <li v-cloak v-for="todo in todoList">
            <input type="checkbox" v-model="todo.done">{{todo.title}} {{todo.createAt}}    
            <span class="done" v-if="todo.done">已完成</span>
            <span v-else></span>        
            <button @click="removeTodo(todo)">X</button>  <!-- todo即此时正遍历的这个 -->
        </li>
    </ol>
</section>
```

##### 功能:如果用户已经登入,就直接展示todo
```js
//app.js
created: function(){
        window.onbeforeunload = (()=>{
            let dataString = JSON.stringify(this.todoList)
            let newTodoStr = this.newTodo //保存输入框内未提交的内容
            window.localStorage.setItem('myData',dataString) 
            window.localStorage.setItem('myNew',newTodoStr)  
        })
        let oldDataString = window.localStorage.getItem('myData')
        let oldnewData = window.localStorage.getItem('myNew')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []
        this.newTodo = oldnewData || ''

        this.currentUser = this.getCurrentUser()  //检查用户是否登录   ++++++++++++ 新加

    },
```
```js
...
getCurrentUser: function(){   //验证是否已经登录,已经登录的话隐藏注册登录窗口
            // let {id,createAt,attributes: {username}} = AV.User.current()  //语法:链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
            // return {id,username,createAt}  //语法: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0

            let current = AV.User.current()  //当前用户: https://leancloud.cn/docs/leanstorage_guide-js.html#hash748191977
            console.log(current)
            if(current){
                let {id,createAt,attributes: {username}} = current
                return {id,username,createAt}
            }else{
                return null
            }
        },
...
```
current对象:
![](https://i.loli.net/2018/04/03/5ac370002daec.png)

这样这两个功能就完成了.

### 综上: 几个关键因素
1. `currentUser` 出现在data中初始值是`null`,view里出现于`<section id="signInAndSignUp" v-if="!currentUser">`(登录注册部分)和`<section id="todo" v-if="currentUser">`(备忘部分)用于判断是否显示登录注册部分还是备忘部分.

2. 具体判断显与否的方法是给`currentUser`赋值,赋值动作在注册,登入,登出行为(signUp,logIn,logOut)里完成. currentUser不为null即为真.此时登录注册部分不显示,todo显示.

3. 另外的关键性因素是`formData`,出现于data,初始时formData:{username:' ',password:' '},在view中出现是在,用户名和密码输入框如`用户名<input type="text" v-model="formData.username">`. 两者双向绑定,当用户在框内输入时,data端立即改变值.当获取到新的username和password时,为登录和注册行为提供依据.

4. 注册功能`signUp` 用到关键对象`AV.User()`远程存储对象. 这个对象有很多重要的方法如下: 
- `AV.User.signUp()` **注册功能**
这个功能与注册按钮绑定,用这个功能前需要先通过`AV.User`发送两个参数:`AV.User.setUsername(this.formData.username)`和`AV.User.setPassword(this.formData.password)`,用户输入导致参数更新,更新后的参数通过`AV.User.setxxxx`发送给远程库.发送完后,即可用`AV.User.signUp()`注册.注册成功后会返回一个对象`loginedUser`.  另外注册完成后给`currentUser`赋值一个状态`this.getCurrentUser`.便于注册部分的显与否.

- `AV.User.login()` **登录功能**
这个功能与登入按钮绑定,同样需要两个参数(this.formData.username,this.formData.password),发送参数后,如果成功返回对象`loginedUser`,则登录成功,成功后也给`currentUser`赋值状态`this.getCurrentUser`,如果error,则`登录失败`

- `AV.User.logOut()` **登出功能**
这个功能与登出按钮绑定,不需要参数直接`AV.User.logOut()`即可,并也同时给`currentUser`赋值一个状态值`'null'`,显示登录注册部分,不显示todo部分.登出后记得
`window.location.reload()`刷新页面

- `AV.User.current()`  **登录状态**
如果存在`AV.User.current()`,即为登录态. `AV.User.current()`也是一个对象,里面有`id,createAt,username等`各种属性.

5. 关键性因素`this.getCurrentUser`,用于给`currentUser`赋值,以决定哪一部分显示与否.定义一个`getCurrentUser`方法并返回需要的值.返回的值很简单,当`if(AV.User.current())`登录状态为真,即可返回值.此时用ES6 的解构赋值获取需要的值:
如:`let {id,createAt,attributes: {username}} = AV.User.current()`
因为username是attributes属性,所以需要`attributes: {username}`的形式,最后返回`return {id,createAt,username}`即可. 如果为否,返回null.


### 小结:
> 上面给各个功能按钮分别绑定<登录><注册><登出>功能,其核心在于都返回一个值赋给状态currentUser(初始为null),当返回值为对象时(含有id,username,createAt)等属性,则登录注册页面消失,todo显示.登出功能直接返回null即可.

> `a.().then((b)=>{})` b是a.()的返回值,作为箭头函数的参数.

> `signUp()`需要`AV.User.setUsername`和`setPassword`才能用`AV.User.signUp`返回一个对象

> `logIn()`直接`AV.User.logIn(data)`就能返回对象.

> `getCurrentUser`方法 用于返回一个对象值(含有id,username,createAt)等属性,并返回其给`currentUser`.

> 直接`AV.User.current()`可以获取登录状态,并返回包含很多属性值的对象.

> 当每次执行<登录><注册>功能时都会触发`getCurrentUser`方法,判断此时是否为登录态`if(AV.User.current())`,并完成返回对象值,赋值给`currentUser`.



-------------------------
## 5-vue-demo3

## 数据关联
之前的几步,虽然我们应该支持注册和登录了,但是用户的数据依然存在于`localStorage`,这一步我们将把数据存到用户名下,也就是让数据与用户关联起来.

### 保存todo
之前的步骤里,我们是在窗口关闭的时候将数据保存到`localStorage`,这次我们也计划在窗口关闭的时候将数据保存到`leancloud`

#### 第一次尝试
我们要用的API基本都在《[数据存储开发指南 · JavaScript](https://leancloud.cn/docs/leanstorage_guide-js.html)》里。

> commit: 页面关闭或刷新时保存数据 代码如下:
```js
//app.js
created: function(){ //created生命周期钩子函数(Vue实例创建之后使用),用于设置数据监听等
        window.onbeforeunload = (()=>{
            let dataString = JSON.stringify(this.todoList)

            var AVTodos = AV.Object.extend('AllTodos')                             //demo-5 新增
            var avTodos = new AVTodos()
            avTodos.set('content',dataString)
            avTodos.save().then(function(todo){
                //保存成功后
                console.log('保存成功')
            },function(error){
                //处理异常
                console.error('保存失败')
            })            
        })
        this.currentUser = this.getCurrentUser()  //检查用户是否登录
    },
    ...
```
修改好后,`webpack --watch`刷新页面两次.

刷新页面之后,发现一个严重的问题,我们无法调试这段代码!

为什么呢? 
因为普通的请求如果发出去,我们是可以看见Network里面有一个请求的但是这次的代码是写在`window.onbeforeunload`里的,所以这个请求已发出,页面就刷新了,Network也清空了.

怎么办?
这时候有两个办法:
1. **使用debugger**
我们在`avTodos.save`这句话结束后,写上一句`debugger`
```js
avTodos.save().then(function(todo){
    //保存成功后
    console.log('保存成功')
},function(error){
    //处理异常
    console.error('保存失败')
})  
debugger //    <======
```

然后刷新页面,就发现断点设置成功了.现在去Network看看有没有保存todos请求,居然还是没有...
看了这个时候请求还没发出去,那么我们到底要怎么看到这个请求呢?

2. **使用`preserve log`

![](https://i.loli.net/2018/04/04/5ac424aa12526.png)

勾选这个之后,就能让页面刷新时不清空`Network`
我们删掉`debugger`,刷新页面,再刷新一次

> 注意为什么要刷新两次? 
第一次是让新代码载入页面,第二次是为了触发`beforeunload`事件

![](https://i.loli.net/2018/04/04/5ac425a92eefa.png)

从结果可以看到,AllTodos保存请求失败了,被`canceled`
浏览器为什么会把我的请求取消掉呢?
因为:
> 如果一个页面就要死了(刷新就表示不要当前页面了,当前页面可以死了),那么这个页面发出的请求也就没有意义了.既然没有意义,浏览器为什么浪费时间去发这个页面请求呢? 所以浏览器直接取消了这个请求.

**综上: `beforeunload`事件里面的所有请求都发不出去,会被取消!**

至此我们第一次保存数据的尝试失败,因为我们在`beforeunload`事件里不能存数据到leanCloud.


## 第二次尝试
真正的程序员,怎么可能被一次失败打倒.接下来我们尝试第二次.

注意,一旦推导出`beforeunload`行不通,就不要再死磕它了.必须推翻以前的思维,重新思考.重新思考我们的目的是什么.

我们是不是希望把用户的数据保存在leanCloud? 那么我们可不可以在用户对数据进行操作的时候马上把数据存到leanCloud,也就是**在每次用户新增,删除todo的时候,就发送一个请求**
即`addTodo`是`saveTodos`,`removeTodo`时也`saveTodos`
如下代码:
```js
 methods: {
        //方案2: 每次增删todo时保存数据
        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos')
            var avTodos = new AVTodos()
            avTodos.set('content',dataString)
            avTodos.save().then(function(todo){
                alert('保存成功')
            },function(error){
                alert('保存失败')
            })
        },
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,  //这里面的属性都是todo的
                createAt:(new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                done: false //添加一个done属性
            })
            this.newTodo = ''    //必须要重置不然会和现在的数组产生关联

            //保存数据到远端
            this.saveTodos()     
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)  
            this.todoList.splice(index,1)   //从index的位置开始删除一个

            //保存数据到远端
            this.saveTodos()
        },
```

刷新页面:
1. 新增一个todo,看到保存的请求
2. 删除一个todo,看到保存的请求

就说明成功了


### 读取todo
存完数据,就要读数据了.
这个时候我们相信这个功能要怎么做,怎么读数据.

每个todo都有一个id,我们可以通过id查询对应的todo,但是我们怎么知道当前用户有哪些todo呢?

我们目前没有办法知道当前用户有哪些todo...

于是需要返工了.我们保存todo的逻辑有问题:**没有将用户和todo关联起来**

### 重新设计保存逻辑
1. todo存在用户名下
2. 只有todo所属的用户能读写这些todo

我们可以使用 LeanCloud 提供的 ACL 功能来实现上面两个功能。「ACL（Access Control List）」概念

翻看《数据存储开发指南 · JavaScript》，找到「角色」这一章节，你会看到一个链接：[JavaScript 权限管理使用指南](https://leancloud.cn/docs/acl-guide.html#hash-1171845695)

修改如下: 
```js
saveTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos')
            var avTodos = new AVTodos()

            var acl = new AVTodos.ACL()
            acl.setReadAccess(AV.User.current(),true)    //只有这个用户对象(AV.User.current()) 可以读取
            acl.setWirteAccess(AV.User.current(),true)   //只有这个用户 可以写



            avTodos.set('content',dataString)

            avTodos.setACL(acl)                          //设置访问控制

            avTodos.save().then(function(todo){
                alert('保存成功')
            },function(error){
                alert('保存失败')
            })
        },
        ...
```

### 重新读取todo
还是需要看文档,我们很容易在文档里找到一个 [根据 id 获取数据的 API](https://leancloud.cn/docs/leanstorage_guide-js.html#hash-2027098679)。

但这不是我们想要的,我们无id可用.继续翻看文档.

你发现有一个「例子」是不需要 id 也能获取数据的，那就是[批量操作](https://leancloud.cn/docs/leanstorage_guide-js.html#hash787692837)的例子

```js
  var query = new AV.Query('Todo');
  query.find().then(function (todos) {
    todos.map(function(todo) {
      todo['status'] = 1;
    });
    return AV.Object.saveAll(todos);
  }).then(function(todos) {
    // 更新成功
  }, function (error) {
    // 异常处理
  });
```

修改代码如下:
```js
    created: function(){
        this.currentUser = this.getCurrentUser()  //获取登录状态对象

        if(this.currentUser){
            var query = new AV.Query('AllTodos');
            query.find()
            .then(function (todos) {
                console.log(todos)
            }, function(error){
                console.error(error) 
            })
        }
    },
```

刷新页面,看到控制台拿到数据了!

![QQ截图20180404135607](https://i.loli.net/2018/04/04/5ac4690c7ec8a.png)

但是为什么是一个数组?

一个用户的AllTodos应该只有一个,而不是多个

原因是，我们存了多个 AllTodos。

我们在用户添加一个 todo 的时候，存了一个 AllTodos；
在用户添加第二个 todo 的时候，又存了一个「新的」AllTodos；
在用户删除一个 todo 的时候，我们又又存了一个「新的」AllTodos……

也就是说，我们的保存逻辑还是有问题。

正确的保存逻辑是:
1. 如果发现当前用户没有存过 AllTodos，那么就存一个「新的」AllTodos
2. 如果发现当前用户存过 AllTodos，那么就应该更新「之前的」AllTodos

### 再次编写存储逻辑
首先，我们去 LeanCloud 的控制面板把 AllTodos 表删除杂项(记得保留初始的第一个)：

![FireShot Capture 1 - 数据管理 - LeanCloud_ - https___leancloud.cn_dashboard_data.html](https://i.loli.net/2018/04/05/5ac509c6b5ec3.png)

然后重写存储逻辑

- 根据id选择save(create)或者update
```js
   created: function(){
        this.currentUser = this.getCurrentUser()  //获取登录状态对象

        if(this.currentUser){
            var query = new AV.Query('AllTodos');
            query.find()
            .then((todos) => {
                let avAllTodos = todos[0]  //因为理论上AllTodos只有一个,所以我们取结果第一项
                console.log(avAllTodos.attributes)
                let id = avAllTodos.id
                this.todoList = JSON.parse(avAllTodos.attributes.content)
                this.todoList.id = id  // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
            }, function(error){
                console.error(error) 
            })
        }
    },
    methods: {
        updateTodos: function(){
            // 想要知道如何更新对象，先看文档 https://leancloud.cn/docs/leanstorage_guide-js.html#hash-2091393899
            let dataString = JSON.stringify(this.todoList)  //// JSON 在序列化这个有 id 的数组的时候，会得出怎样的结果？
            let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)
            avTodos.set('content',dataString)
            avTodos.save().then(()=>{
                console.log('更新成功')
            })
        },
        //方案2: 每次增删todo时保存数据
        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos')  //构建一个构建一个 AV.Object https://leancloud.cn/docs/leanstorage_guide-js.html#hash799084270
            var avTodos = new AVTodos()

            var acl = new AVTodos.ACL()
            acl.setReadAccess(AV.User.current(),true)    //只有这个用户对象(AV.User.current()) 可以读取
            acl.setWirteAccess(AV.User.current(),true)   //只有这个用户 可以写



            avTodos.set('content',dataString)

            avTodos.setACL(acl)                          //设置访问控制

            avTodos.save().then(function(todo){
                this.todoList.id = todo.id   //// 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
                alert('保存成功')
            },function(error){
                alert('保存失败')
            })
        },

        //更新或保存todo
        saveOrUpdateTodos: function(){
            if(this.todoList.id){
                this.updateTodos()
            }else{
                this.saveTodos()
            }
        },

        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,  //这里面的属性都是todo的
                createAt:(new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                done: false //添加一个done属性
            })
            this.newTodo = ''    //必须要重置不然会和现在的数组产生关联

            //保存数据到远端
            //this.saveTodos() 
            this.saveOrUpdateTodos() // 不能用 saveTodos 了    
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)  
            this.todoList.splice(index,1)   //从index的位置开始删除一个

            //保存数据到远端
            //this.saveTodos()
            this.saveOrUpdateTodos() // 不能用 saveTodos 了
        },

```
> 小结流程: 
1. 使用leanCloud云端来保存本地数据,首先需要 `npm install leancloud-storage --save`安装依赖
2. 在leancloud,创建一个应用,获取到`APP_ID` `APP_KEY`(从leancloud 应用个人应用设置下可以看到). 然后初始化`AV.init` 
3. 核心元素: `AV.Object`,需要明确的是我们保存的一切数据都是储存在这个对象上的. 使用它需要创建其实例.
4. 创建钩子函数`created`: 触发时机,实例创建完成后被调用,挂载阶段还没开始,$el属性目前不可用. 可以简单理解为页面加载时.

理解各个生命周期钩子:
```js
export default {
    beforecreate() {
        //  创建前状态
    }
    created () {
        //  创建完毕状态
    }
    beforeMount(){
        //  挂载前状态
    }
    mounted(){
        //  挂载结束状态
    }
}
```

5. `created`钩子函数(页面重新加载就会由触发一次,如登录等.),主要内容: 
- 获取当前登录态赋值给currentUser来决定是否显示todo. 
- 触发`fetchTodos`函数,如果是登录态,则通过`AV.query`(参数是className)的实例query, 通过`find()`方法 返回`todos`表对象(`AllTodos的数组`)(包含了权限,内容等各种数据),理论上只存在一个,后面的修改都在其基础上数据更新.
- 为了保险起见,取`todos[0]`第一个`AllTodos`,然后获取到id,并`avAllTodos.attributes.content`(todo的内容)转为字符串形式,更新给todoList,并显示在页面上.
- 将id作为属性赋给这个`todoList`数组.

6. 定义`fetchTodos`函数 有时候会出现登出重新登录后不显示todo的bug.解决办法:在login函数里登录后触发`this.fetchTodos()`重新读取一次数据.AllTodos利用`fetchTodos`函数(在created里执行)封装读取过程,赋值云端的数据给todoList数组.

7. `updateTodo`函数 上面的是加载已有todo的函数,接下来定义本地新建todo后更新到云端的updateTodos函数.
参考: https://leancloud.cn/docs/leanstorage_guide-js.html#hash810954180
- 将本地数组`this.todoList` [JSON字符串化](https://blog.csdn.net/wangxiaohu__/article/details/7254598/ ) . 
- 通过`let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)`使用className和储存到`this.todoList.id`作为参数来构建一个AV.Object中的AllTodos的实例(利用核心元素中的className对象储存数据) 
- `avTodos.set('content', dataString)`,使用set方法将json字符串化的`todoList数组`储存的`content`属性(该属性通过`avAllTodos.attributes.content`读取)里面.
-  更新完后保存`save()`即可.

8. - 定义`savaTodos`函数用于第一次储存数据到远端. 同样只要涉及到储存数据,就需要把todoList json字符串化.
- 也同样需要使用`AV.Object`对象,由于是第一次存储到远端,需要`var AVTodos = AV.Object.extend('AllTodos')`创建一个AV.Object的子类.参考https://leancloud.cn/docs/leanstorage_guide-js.html#hash799084270
- 然后创建该对象的实例 另外第一次创建AllTodos还需要设置访问权限.`var acl = new AV.ACL()  acl.setReadAccess(AV.User.current(),true) acl.setWriteAccess(AV.User.current(),true)`,`AV.User.current()`是当前用户. 上面的意思是当前用户才可读,才可写. 另外需要注意的是`AV.User.current()`和`AllTodos`是同一个对象值. 只是`AV.User.current`只有在登录态才有值.
- avTodos.setACL(acl) //设置访问控制  avTodos.set('content',dataString)     //添加新增内容
 avTodos.save().then()  //储存并触发后续函数.
- 最后在后续回调函数里,必须记得 `this.todoList.id = todo.id`  todo是返回的对象作为then()里函数的参数.一定要把id储存到 `this.todoList`上,否则`this.todoList.id`在`updateTodos`中将无值可用

9. 定义`saveOrUpdateTodos`条件函数:
```js
saveOrUpdateTodos: function(){
    if(this.todoList.id){   //有了id说明已经跑了一遍saveTodos了(已创建好初步类表),不能再跑第二遍,所以执行updateTodos
        this.updateTodos()
    }else{                      //第一次创建todo,返回todo对象,将todo.id 赋给this.todoList,这样this.todoList有了值,下次将可以顺利执行更新函数
        this.saveTodos()        //意思是saveTodos仅执行一次(创造了一个className),第二次便执行更新todos,因为不需要重新创建AllTodos了
    }
},
```

10. 定义`addTodo` 即在`this.todoList`里push三个属性值(this.newTodo,createAt,done),push完后需要记得,将this.newTodo重置为'',否则将会view更新,导致数组原来存储的值也更新. 最后触发条件函数`this.saveOrUpdateTodos()`

11. 定义`removeTodo` 即主要获取到索引值index,使用`this.todoList`数组方法indexOf(todo),这个todo是此时正在遍历的这个.然后使用数组方法`splice(index,1)`,删掉索引位置的一位.即可. 最后触发条件函数`this.saveOrUpdateTodos()`

12. 定义`signUp`注册功能.  关键对象: `AV.User()`,创建其实例. 创建好后,其注册功能需要设置好username和password(这两个值与输入框相绑定),设置好后`user.signUp()`注册,然后then()返回loginedUser对象 参考:https://leancloud.cn/docs/leanstorage_guide-js.html#hash-452155059,
将`currentUser`赋值于`this.getCurrentUser()` 这个值通过`AV.User.current()`登录态对象获取,
获取三个属性即可(username,id,createAt) ,返回的值可以部署到页面上,也可以判断是否显示注册登录.

13. 定义`login`登录功能  关键对象: `AV.User.login(username,passWord)`,同样返回then((loginedUser)=>{}),同样赋值给currentUser,记得触发`fetchTodos()` todos更新

14. 定义`logOut`登出功能 关键对象: `AV.User.logOut()` 同样赋值currentUser为null. `window.location.reload()`  刷新页面

15. 定义`getCurrentUser` 函数, 用于返回一个对象(三个属性:id,createAt,username)赋给`this.currentUser`.

16. 完

<br>
<br>

> 综上: 
>- savaTodos和updateTodos 都是用于数据更新,区别在于前者用于首次创建todo的时候,创建过程中会在远端创建一个`AllTodos`className-使用`AV.Project.extend(AllTodos)`创建子类,并使用子类的new实例来保存内容. 后者直接用`let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)` 一步到位,通过id与AllTodos管理并创建了实例,然后直接通过`avTodos`来保存内容.
>- 页面加载的时候,需要给个created钩子函数来自动加载数据.加载前需要`this.currentUser = this.getCurrentUser()`,通过赋值判断是否是登录态,是的话使用AV.Query('AllTodos'),不需要id.获取到AllTodos后,根据其属性值来更新view.
>- 在给this.todoList push新的数据后,一定要记得重置`this.newTodo = ''`
>- `this.currentUser = this.getCurrentUser()` 出现在页面重载的时候,用于赋值于currentUser,决定页面的展示部分,有下面几个场景:
>1. 钩子函数created页面刚加载的时候
>2. 注册signUp后
>3. 登录signIn后
>4. 登出logout后,赋值为null