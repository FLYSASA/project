### 1.项目流程
1. github新建项目,clone至本地

2. 创建一个package.json文件
 `npm init` 

3. vue-cli脚手架安装
`npm install -g vue-cli`   

4. vue初始化
`vue int webpack .` 

5. 初始化后安装依赖
`npm install`

6. 启动开发环境
`npm run dev`

7. 构造各个组件

8. build文件
`npm run build`

以上便是基本开发流程.需要注意的几个点:
- 打开浏览器不是默认的,如果想默认打开,在config/index.js文件修改`autoOpenBrowser: true`

- vue初始化之后的文件目录中,各个文件夹存放不同文件. 在`config`中是配置文件.开发的源代码存放在`src`中.

- 我们主要开发src中的文件,其目录结构为:
```
src
├── App.vue                # App.vue 是主组件，后面讲什么是组件
├── assets                 # assets 用于放置代码之外的资源，比如图片、字体、reset.css等
├── components       # components 用于放置主组件之外的组件，vue 组件的后缀都是 .vue
├── main.js                # JS 入口文件，浏览器执行的第一行代码在这里，所以我们先看这里
└── router                 # 路由，目前用不到
```

- `main.js`中主要是构建实例,和引入外部组件(如element-ui组件)等

- `App.vue`用于构建页面结构,各个组件的集合.引入其它组件,外部css等


```js
//App.vue
//如何引入其它组件?

import Topbar from './components/Topbar'

export default {
    components: {Topbar}
}


//如何引入外部css?
import './assets/reset.css'  //直接路径即可
```


#### 2.关于css预处理
1. 下载normalize.css
`npm install --save normalize.css`
2. App.vue中引入
`import 'normalize.css/normalize.css'`
3. 如果存在`reset.css`需要将normalize的引入写在前面

4. 安装css预处理 `scss`
`npm install --save node-sass sass-loader`

5. 书写scss
```html
<style lang="scss">

</style>
```

#### 3.关于github预览页面
1. 将.gitignore里的dist删掉
2. 在config/index.js 中的`assetsPubulicPath` 改为: `assetsPubulicPath: '',`.
3. 在 `build/utils.js` 中的 `ExtractTextPlugin.extract` 传入参数 `publicPath: '../../'`
完美解决本地和服务器上资源url解析的问题: 由于图片放置在assets里出现的url解析错误
参考: https://my.oschina.net/u/1778998/blog/1609856
4. 生成build文件
`npm run build`
5. git push文件
6. 在githubpage生成线上预览目录,到`/dist`即可

#### 4.关于各组件书写规范
**一个单文件组件只包含三个根标签**:
`<template>`
`<script>`
`<style>`
三者分别表示页面内容,行为和样式.

使用单文件组件注意事项:
1. `<template>`有且仅有一个儿子标签
2. `<script>`里必须包含`export default {}`,必须导出一个对象
3. `export default {}`中的data属性必须是函数返回值如:
```
data(){
    return {
        xxx: yyy
    }
}
```
4. `<style>`默认只支持css,如果想支持scss,见上面.
5. 如果没有禁用ESLint会出现各种规范问题,如果`vue init webpack .`时候误开启,可以在`config/index.js`修改:
```
useEslint: true, // 改为false即可
```

<hr>
以上便是vue-cli脚手架基本开发流程准备工作. 下面便是vue-resumeEditor实战.

### 1. 预备知识整理
vue常用指令: 
- v-bind
用于绑定属性 可以简写为 ':'
常用的几个属性绑定方式:
①绑定class属性
`:class="{active:布尔值或者是一个返回布尔值的表达式}"`
如:
```
:class="{active:true}"
:class="{actvie: item === selected}"
```
②绑定自定义属性
如:
`:visible="布尔值或者是赋予布尔值的变量"`
常与
`v-if="visible"` 联用

- v-on
用于监听事件,可以简写为"@"
常用的监听事件:
①click事件
`@click="a"`  //a代表事件变量
如果绑定的事件元素上由默认事件如: a链接,submit等,需要
`@click.prevent = "a"`  
```
methods: {
    a(){}  //定义a事件
}
```
②自定义事件
`@success="signIn($event)"`  //success后触发事件
常用于监听子组件 `this.$emit('事件')`触发的事件

- v-if
用于显隐html元素:
`v-if="布尔值或返回布尔值的变量表达式"`  //布尔值为true则显示,为false则不显示

- v-show
同上,只是无论如何都会渲染到页面上

- v-for
遍历元素,哪个元素需要循环出现就绑定在哪个元素上.
常与ol ,li联用:
```html
<ol>
    <li v-for="item in items"></li>   //li一直循环出现,需要在data里面定义items
</ol>    
```

### 2.实战
#### - 1 主组件初步架构
- 分为三大子组件,Topbar、ResumeEditor、ResumePreview.
布局： 
header > Topbar
main > ResumeEditor、ResumePreview.

> header中两栏布局,左logo右actions按钮区,可flex布局
> main中两栏布局,占满父容器,左边width: 35%(如果不想被右边压扁的话设置`flex-shrink:0`);右边width flex: 1;  

- 引入三大子组件
```
import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

...
components: {Topbar,ResumeEditor,ResumePreview}
```

- 引入所需的其它组件
```
import 'normalize.css/normalize.css'  //默认样式在各个平台一样
import './assets/reset.css'           //将某些默认样式重置掉,与上面不冲突,但是这个顺序在后面
import icons from './assets/icons'   //引入经过图标脚本合并过的icons.js
```

- html绑定事件和各种属性
1. 父容器绑定 属性用于控制预览显隐
```html
<div class="page" v-bind:class="{previewMode: previewMode}">
```
实现原理:

- 为父容器增加一个属性,在这个属性下子元素呈现不同的显隐状态,此处这个属性下Topbar,ResumeEditor隐藏,ResumePreview显示.
`第一个previewMode是自定义属性名字,第二个是data定义的布尔值变量名用于控制属性的存在与否,必须首先在data里给个初始值这里是false`
<br>  
- 什么时候变为true? 
根据页面功能,当点击预览按钮时,触发函数将变量`previewMode: true`,所以需要给预览按钮绑定 `@click="触发显隐事件"
预览按钮位于子组件Topbar中,要与其进行事件交互,需要使用父组件监听v-on:显隐事件名="显隐事件"(监听事件一定要绑定在主组件中子组件标签上否则无效)和子组件触发"this.$emit('显隐事件')"
具体实现:
```js
//App.vue
<Topbar v-on:preview="preview" id="topbar"/>   //监听子组件的事件

methods: {
    preview(){
        this.previewMode = true
    }
}

//Topbar.vue
<button class="button watch" @click="preview">预览</button>  //定义点击事件

methods: {
    preview(){
        this.$emit('preview')
    }
}
```

由此看出,父子组件在methods都定义了preview事件,
只是Topbar.vue中的preview负责在事件发生按钮上绑定事件,以及在解释事件的时候触发父组件的同名事件.
而App.vue中,首先利用子组件标签监听该事件, `v-on:preview="preview"`,然后在methods中具体定义该事件.

- 至此主组件功能基本完成,然后定义一个退出预览标签,绑定`@click="XXX"`,在XXX中将previewMode变为false.即可


### - 2 Topbar组件架构
结构很简单,左边logo区右边actions按钮区. 然后点击按钮弹出窗口(一个子组件).

actions区域又分为:
1. 展示id信息区和登出按钮
决定是否展示这个区块的决定因素是是否是登录态的关键因素是 `this.user.id`
这个关键性因素的值从store>index.js中的state获取
```html
<div v-if="logined" class="userActions"> <!-- 如果存在logined,则显示id区 -->
    <span class="welcome">你好,{{user.username}}</span>
    <a href="#" class="button" @click.prevent="signOut">登出</a> <!-- 因为是a链接绑定登出按钮所以需要click.prevent -->
</div>   
```
```js
computed:{
    user(){
        return this.$store.state.user    //必须在计算属性中才能获取到state
    }
    logined(){
        return this.user.id
    }
}
methods: {
    signOut(){
       AV.User.logOut()
       this.$store.commit('removeUser')   //由于单向绑定,改变state值的唯一方法是this.$store.commit('')
    }
}
```

2. 展示登录注册按钮
id区和展示登录按钮区是个 v-if v-else的关系,id信息不展示就展示这个.

展示登录注册按钮默认显示的,它们都绑定于a链接,并且绑定一个点击事件,一旦点击弹出登录或者注册框

如何点击按钮弹出一个对话框?
- 给两个a链接按钮,绑定变量signUpDialogVisible,它的布尔值决定了对话框的显隐
```html
<a href="#" class="button primary signup" @click.prevent="signUpDialogVisible = true">注册</a>             
<a href="#" class="button" @click.prevent="signInDialogVisible = true">登录</a>
```
- 在Topbar组件中定义对话框子组件标签,并通过visible传入`signUpDialogVisible`值,通过title传入`注册登录`
```html
<!-- Topbar组件 -->
<MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
    <SignUpForm @success="signIn($event)" />
</MyDialog>
<MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
    <SignInForm @success="signIn($event)"/>
</MyDialog>
```

给对话框绑定visible属性即为`signUpDialogVisible`,visible属性决定子组件MyDialog的显隐.

```html
<!-- MyDialog组件 -->
<div class="dialogWrapper" v-show="visible">  <!-- 当visible为true显示 -->
      <div class="dialog">
          <header>
              {{title}}
              <el-button type="danger" class="close" @click="close"><i class="el-icon-close"></i></el-button>  <!-- 点击的时候触发父组件的close事件 -->
          </header>
          
          <main>
              <slot></slot>   <!-- 用来放置父组件内子组件标签里的内容 -->
          </main>
      </div>
  </div>
```

注意如果子组件想使用父组件传过来的变量需要先定义一次:
```js
export default {
    props: ['title','visible']
}
```

- 另外子组件中的关闭按钮绑定事件`@click="close"`:
```js
methods: {
    close(){
        this.$emit('close')   //this.$emit用于触发父组件的事件
    }
}
```

父组件持续监听该关闭事件,触发signInDialogVisible = false,此时visible也为false,所以对话框隐藏
```html
<MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
```

以上即是点击按钮弹出对话框的基本流程.可归纳出父子组件之间的通信过程:
- 父组件通过在自身中的子组件标签将变量传输给子组件 :visible="true",
子组件通过 `props:['visible']`接收变量
- 子组件触发事件通过在按钮上绑定触发事件(`this.$emit('事件')`),父组件通过标签v-on:事件="methods"来监听事件.



3. 另外在MyDialog组件里面还有一个SignUpForm组件或SignInForm组件,它们通过slot存在于MyDialog组件的main标签里面.组件具体如何定义的呢?
signUpForm和SignInForm,它们都有一个共同点,即一旦点击提交都会触发对话框隐藏事件,即在这个事件中
```
this.signInDialogVisible = false      //隐藏登录对话框
this.signUpDialogVisible = false      //隐藏注册对话框
```
```html
<!-- Topbar.vue -->
    <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <SignUpForm @success="signIn($event)" />
    </MyDialog>
    <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </MyDialog>
```
```js
//Topbar.vue 
 signIn(user){   //父组件监听success事件,触发 signIn
      this.signInDialogVisible = false         //同时关闭登录注册框
      this.signUpDialogVisible = false      
      this.$store.commit('setUser',user)       //登录完后更新登录state
    },
```

通过`<slot>`存在于,myDialog的mian中,
```html
<!-- signUpForm.vue -->
  <div class="action">
      <form @submit.prevent="signUp">
          <div class="row">
              <label>用户名:</label>
              <input type="text" v-model="formData.username" required>
          </div>
          <div class="row">
              <label>密码:</label>
              <input type="password" v-model="formData.password" required>
          </div>
          <div class="actions">
              <input type="submit" value="提交">
              <span class="errorMessage">{{errorMessage}}</span>
          </div>
      </form>
  </div>
```

```html
<!-- signInForm.vue -->
    <div class="action">
        <form @submit.prevent="signIn">
            <div class="row">
                <label>用户名</label>
                <input type="text" required v-model="formData.username">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="password" required v-model="formData.password">
            </div>
            <div class="actions">
                <input type="submit" value="登录">
                <span class="errorMessage">{{errorMessage}}</span>
            </div>
        </form>
    </div>
```

```js
//signUpForm.vue
signUp(){
          let {username,password} = this.formData  //解构赋值,赋给变量username,password
          var user = new AV.User()
          user.setUsername(username)
          user.setPassword(password)
          user.signUp().then(() => {   
              //注册成功触发父组件success事件
              this.$emit('success',getAVUser())
          },(error)=>{
              this.errorMessage = getErrorMessage(error)
          })
      }
```

```js
//signInForm.vue
signIn(){
            let {username,password} = this.formData
            AV.User.logIn(username,password).then(()=>{
                this.$emit('success',getAVUser())
            },(error) => {
                this.errorMessage = getErrorMessage(error)
            })
        }
```

这两个组件主要决定了,myDialog组件的展示内容,同时完成与后台的交互.
通过form表单的`@submit`事件触发`signIn`和`signUp`

在进行signIn和signUp操作前一定要记得**引入leanCloud**,如何引入?

1. 首先 https://leancloud.cn/  创建一个账户
2. 创建resumer应用,接下来我们要安装LeanCloud的「[JavaScript SDK 文档](https://leancloud.cn/docs/sdk_setup-js.html)」来开发登录、注册功能
3. 参考 [Leancloud SDK](https://leancloud.cn/docs/sdk_setup-js.html)安装:
`npm install leancloud-storage --save`
4. 新建lib文件夹,专门存放于后台相关的东西
5. 创建lib/leanclound.js文件,初始化
```js
import AV from 'leancloud-storage'

var APP_ID = 'sbLVjiiurqmnXDdi0zBJsy35-gzGzoHsz';
var APP_KEY = 'q68Gdtw5uPzJNDvCpYijbluS';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
 

export default AV  //输出AV对象,存储数据核心元素
```
6. 创建lib/getAVUser.js,获取用户登录信息id和username
```js
import AV from './leancloud'

export default function(user){
    var {id,attributes:{username}} = user || AV.User.current() || {attributes:{}}
    return {
        id: id || '',
        username: username || ''
    }
}
```
7. 新建lib/getErrorMessage.js,获取错误反馈信息.
```js
const map = {
    202: '用户名已被占用',
    210: '用户名和密码不匹配',
    211: '找不到该用户',
    217: '无效的用户名',
    unknown: '请求失败,请稍后再试'
}

export default function({code}){
    return map[code] || map.unknown
}
```
8. 将脚本注入到不同组件中,
```js
//App.vue
import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser' 

//Topbar.vue
import AV from '../lib/leancloud'
```


### 如何使用Vuex?
由于子组件之间无法完成通信,所以需要一个数据库,来实现数据共享.如何搭建数据库?
1. 安装Vuex:
`npm install vuex --save`
2. 新建store文件夹,在文件夹中新建index.js
3. index.js中引入Vuex
```js
//index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)   //调用Vuex将state注入到每一个子组件中的必备条件

export default new Vuex.Store({   //新建Vuex.Store实例输出store对象,参考例子
   state: {
        user: {
            id: '',
            username: ''
        }
})        
```

4. 在根组件(App.vue)中新建store选项,并引入:
```js
//App.vue
import store from './store/index'    //引入store实例
export default {
    store        //Vuex通过这个根组件中store选项,store实例将注入到各个子组件中
}
```

5. 子组件可通过$store访问到
```js
//Topbar.vue
 computed: {
    user(){
      return this.$store.state.user  //获取store库里的user赋给变量user
    },
    logined(){
      return this.user.id
    }
  },
```

6. 子组件如果想改变store库里的state值,必须通过`this.$store.commit('xxx')`触发store实例中的回调
```js
methods: {
    signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')   //括号里的是回调函数,触发store里的回调
    },
    ...
```

7. 在store中,所有的回调都在mutations对象里:
```js
export default new Vuex.Store({
    state: {
        ...
    }
    mutations: {
        removeUser(state){
            state.user.id = ''
            state.resume = this.state.resume
        }
    }
})
```
> 在mutations里的回调函数里,第一个参数必须是state,函数内部基本上是为了改变state中的某个值.

##### 总结以上引入Vuex的步骤
- `npm install --save vuex`
- 新建store文件夹,index.js文件,引入Vue和Vuex,并新建Vuex.Store实例
- 在实例中定义state和mutations
- 在主组件中引入store并添加store选项
- 子组件使用,state里面的数据通过在computed中: `this.$store.state.xxx`,子组件改变state通过提交回调: `this.$store.commit('xxx')`
- 回调定义在store的 mutations中,使用state作为第一个参数.


### 关于SignUpForm和SignInForm组件的构建
```html
<template>
  <div class="action">
      <form @submit.prevent="signUp">
          <div class="row">
              <label>用户名:</label>
              <input type="text" v-model="formData.username" required>
          </div>
          <div class="row">
              <label>密码:</label>
              <input type="password" v-model="formData.password" required>
          </div>
          <div class="actions">
              <input type="submit" value="提交">
              <span class="errorMessage">{{errorMessage}}</span>
          </div>
      </form>
  </div>
</template>

<script>
import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
import getAVUser from '../lib/getAVUser'
export default {
  name: 'SignUpForm',
  data(){
      return {
          formData:{
              username: '',
              password: ''
          },
          errorMessage: ''
      }
  },
  methods: {
      signUp(){
          let {username,password} = this.formData  //解构赋值,赋给变量username,password
          var user = new AV.User()
          user.setUsername(username)
          user.setPassword(password)
          user.signUp().then(() => {   
              //注册成功触发父组件success事件
              this.$emit('success',getAVUser())   //getAVUser()即lib中的getAVUser.js
          },(error)=>{
              this.errorMessage = getErrorMessage(error)
          })
      }
  }
}
</script>

```

signUpForm主要在form上绑定了`@submit.prevent="signUp"`事件,在这个事件中,主要做了下面几件事:
- 引入`AV(用于注册登录)`,`getErrorMessage(用于获取到错误信息)`,`getAVUser(用于获取到现登录用户的id和username)`
- 将用户输入的formData,保存给{username,password}
- 新建AV.User()实例,通过将上一步的参数传给实例的setUsername()和setPassword()两个方法,注册账号.
- user.signUp()注册并触发父组件的success事件(用于关闭对话框),以及传入此时的注册用户信息(**用户一旦注册,会在getAVUser()脚本中的AV.User.current()更新登录信息**)

##### SignInForm组件与SignUpForm类同
只是使用了AV.User.logIn()的方法登录,然后同样通过`this.$emit('success',getAVUser())`触发父组件的success事件以及传入登录态的id和name.

### Topbar组件的success事件
```html
<SignUpForm @success="signIn($event)" />  <!-- $event即传过来的参数(id和name) -->
<SignInForm @success="signIn($event)"/>
```
成功后都触发的是signIn事件:
```js
signIn(user){   
      console.log(user)
      this.signInDialogVisible = false    
      this.signUpDialogVisible = false      
      this.$store.commit('setUser',user)    
    },
```
success事件主要做了两件事:
- 关闭登录或者注册框
- 将得到的新的id和name作为参数发给回调setUser

### 关于id展示区
```html
<!-- Topbar.vue -->
<div v-if="logined" class="userActions">
                <span class="welcome">你好,{{user.username}}</span>
                <a href="#" class="button" @click.prevent="signOut">登出</a>
 </div>
```
```js
computed: {
    user(){
      return this.$store.state.user  //获取store库里的user赋给变量user
    },
    logined(){
      return this.user.id
    }
  },
methods: {
    signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')
    },
    ...
}      
```
通过从store中获取user以及它的属性id判断是否存在id来决定显隐,同时登出按钮绑定signOut事件,
登出主要用了`AV.User.logOut()`方法,同时出发store实例里的removeUser回调,该回调主要将state中的`state.user.id = ''`

至此Topbar中的功能基本完成,信息数据初步存储.

## 总结登录注册登出:
1. signUpForm中,通过用户输入的formData注册:
- `AV.User.setUsername(username)`
- `AV.User.setPassword(password)`
- 
```
AV.User.signUp().then(()=>{
    this.$emit('success',getAVUser())
},(error)=>{
    this.errorMessage = getErrorMessage(error)
})
```

2. 注册成功后触发success事件,并传入注册的id和username
signInForm中,使用用户输入的formData登录:
- 
```
AV.User.login(username,password).then(()=>{
    this.$emit('success',getAVUser())
},(error)=>{
    this.errorMessage = getErrorMessage(error)
})
```

3. 在Topbar.vue的
```html
    <div v-if="logined" class="userActions">
        <span class="welcome">你好,{{user.username}}</span>
        <a href="#" class="button" @click.prevent="signOut">登出</a>
    </div>
```
通过
```
signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')
    },
```
将username重置为''



### ResumeEditor组件构建
```html
<!-- App.vue -->
<ResumeEditor/>
```

并没有传入变量或者方法等.直接一个裸标签.

在`ResumeEditor.vue`中,其HTML大体结构也很简单,一个nav(用于展示左侧切换图标) 一个是panels用于右侧的信息编辑区. 两者是典型的左右布局,可以flex.
nav区的宽度设为80px,panels的flex-grow: 1;占据父容器剩余空间.
nav中的图标以ol li形式存在,li因为是块级元素,会自动上下排布,但是有个居中问题,图标无法居中,所以也需要给li,`display: flex;justify-content: center;align-items: center;`,达到居中效果. 同时需要给li一个选中状态的样式active.

基本上Vue中的li基本上都以v-for形式存在,nav下的li也不例外,我们需要现在store里面定义好我们需要的数据,如rusume,它是一个对象,里面有li的各个名称,同时也有个元素是config,里面是图标名.

因为我们需要store里面的数据resume,所以需要在计算属性里面得到:
```js
//ResumeEditor.vue
computed: {    //计算属性
      resume(){
          return this.$store.state.resume  
      }
  },

```
获取到需要的数据后,就可以去遍历了
```html
<ol>
    <li v-for="(item,index) in resume.config"   
        :class="{active: item.field === selected}"
        @click="selected = item.field"> 
            <svg class="icon">
                <use :xlink:href="`#icon-${item.icon}`"></use> 
            </svg> 
    </li>
</ol>
```
需要明确的是我们需要循环li,所以v-for绑定在li上,另外需要点击li触发class="active"属性为真,所以需要在li上绑定`class="{active:条件语句}"`属性,一旦条件为真,则绑定active属性,

**如何实现点击绑定active属性?**

- 点击事件发生时,active为true,所以此时需要 `@click="条件语句为真"`,在这里两个语句分别是,`:class="{active:item.field===selected}"`和`@click="selected = item.feild"`
- 给selected一个初始值,即'profile',默认显示第一个. 但是有个问题,在store里面的数据是单向绑定的,即可读不可写,如果要既能读也能写的话需要在computed中的selected同时设置get(获取selected值)和set(设置selected值)方法,如下:
```js
//resumeEditor.vue
computed: {
    selected: {
        get(){
            return this.$store.state.selected  
        },
        set(){
            return this.$store.commit('switchTab',value)  //value即被点击的item.field
        }
    }
}
```
```js
//store index.js
mutations: {
    switchTab(state,payload){
        state.selected = payload
        localStorage.setItem('state',JSON.stringify(state))
    }
}
```

#### 关于引入li里面的图标:
- iconfont加入需要的图标,生成symbol在线图标
- 在index.html中在线引入,复制需要的属性到主组件
- 
```html
<svg class="icon">
    <use :xlink:href="`#icon-${item.icon}`"></use>    <!-- ${}占位符 在js中不允许短横线存在,所以需要加引号`` -->
</svg> 
```

### 如何显示对应的编辑面板panel?
在上面我们实现了tab切换,但是我们需要tab切换的同时右边panel面板也跟随切换.panel的html结构同样也是ol li,只是当li被选中时才会显示.一次显示一个即tab对应的那个.
- 使用v-for遍历 `v-for="(item,index) in resume.config"`
- 添加 `v-show="item.field === selected"` ,tab的点击事件会让这个条件成立,从而显示对应的panel.


### 编辑面板panel内部如何陈列数据?
- 分析数据类型,除了profile是对象其它都是数组,依然需要分情况套路
`v-if="(resume[item.field] instanceof Array)"`
`v-else`

- 当数据为数组时遍历数组的每一项,然后将每一项的key和value部署到页面上.

- 部署input框内的数据,`:value="value"`,由于用户输入时涉及到框内的数值改变,需要实时更新store内的数据,所以需要一个函数如:
```html
<input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`,$event.target.value)">
```

- 
```js
//ResumeEditor.vue
methods: {
    changeResumeField(path,value){ 
          this.$store.commit('updataResume',{
              path,
              value
          })
      },
}
```

- 
```js
//store index.js
mutations: {
    updataResume(state,{path,value}){
            objectPath.set(state.resume,path,value) 
            localStorage.setItem('state',JSON.stringify(state))
    },
}
```

更新input里的数据的时候有个问题,如何找到store对应的某一项并更新? 

我们需要找到这一项在数组数据中的位置,需要给input绑定函数,而且要传入两个参数,一个是改变的value的位置,一个是value值.

获取到value值需要一个插件**object-path**  参考: https://www.npmjs.com/package/object-path
它的作用是**使用路径访问深层属性**  就比如这里的`${item.field}.${i}.${key}` 深层的key.

如何使用**object-path**?  
 1. 下载
 `npm install object-path --save`
 2. 在需要path的地方引入,如这里的 store里的index.js
```js
import objectPath from 'object-path'

mutations:{
  updataResume(state,{path,value}){
    objectPath.set(state.resume,path,value)   //使用objectPath对象的set方法将第一个参数设置属性为path,值为value,path是个字符串
  }
}
```
3. objectPath.set(a,path,value)   //将a的path属性值设为value


#### 如果数据是对象:
```html
<div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
    <label>{{key}}</label>
    <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)">
</div>
```
比数组少遍历一层i


### 加入添加和删除按钮项
- 添加按钮(只针对数据是数组的类型)
```html
<div v-if="(resume[item.field] instanceof Array)">
    ...  
</div>
<el-button class="add-btn" v-on:click="addExp(item)" type="primary" >添加</el-button>
```
按钮的位置应该在div判断语句外并绑定添加事件
```js
addExp(item){
    let keys = Object.keys(this.resume[item.field][0])  //获取到数组中每一项前的所有key的集合
    const empty = {}
    keys.map((key) => {
        empty[key]  = ''
    })
    this.resume[item.field].push(empty)
}
```

- 删除按钮(只针对数据是数组的类型)
```html
<li v-for="(item,index) in resume.config" v-show="item.field === selected"> 
    <div v-if="(resume[item.field] instanceof Array)">
        <div class="subitem" v-for="(subitem,i) in resume[item.field]"> 
            ...
            <el-button v-on:click="delExp(item)" class="delete-btn" type="primary" icon="el-icon-delete" ></el-button>
            <hr>
        </div>
    </div>
</li>    
```
因为每一项都有删除按钮,所以应该在遍历数组每一项的循环语句内的最后一行
```js
delExp(item,i){
 if(this.resume[item.field].length > 1){
            this.resume[item.field].splice(i,1) 
 }     
}
```


### ResumePreview.vue 组件构建
这个组件构架比较简单,就和排版html一样,在哪一个本分展示什么.
首先当然是引入store里面的resume.
```js
export default {
    computed: {
        resume(){
            return this.$store.state.resume
        }
    }
}
```
使用resume的各个属性值排版.

<hr>

### 至此项目构建完成












