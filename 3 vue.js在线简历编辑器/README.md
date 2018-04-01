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