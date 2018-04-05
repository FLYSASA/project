// import Vue from 'vue'
// var app = new Vue({
//     el: '#app',
//     data: {
//         newTodo: '',
//         todoList: []
//     },
//     created: function(){
//         let i = 0
//         setInterval (()=>{
//             this.newTodo = i //this.newTodo就是data.newTodo,实际上 this.newTodo 是 data.newTodo 的代理
//             i += 1
//         },1000)
//     }
// })

import Vue from 'vue'
import AV from 'leancloud-storage'  //引入leanclound-storage AV 存储

var APP_ID = 'sbLVjiiurqmnXDdi0zBJsy35-gzGzoHsz'
var APP_KEY = 'q68Gdtw5uPzJNDvCpYijbluS'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})


var app = new Vue({
    el: '#app',
    data: {
        actionType: 'signUp',  //主要用来让注册登入显示隐藏,初始值signUp显示
        formData: {
            username: '',  //和输入框绑定
            password: ''
        },
        newTodo: '',
        todoList: [],

        currentUser: null    //判断用户是否登录，初始为null,即false
        //当currentUser = this.getCurrentUser() =>return {id,createAt,username},不为null即是true
    },
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

        this.currentUser = this.getCurrentUser()  //检查用户是否登录

    },
    methods: {
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,  //这里面的属性都是todo的
                createAt:(new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                done: false //添加一个done属性
            })
            this.newTodo = ''
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)  
            this.todoList.splice(index,1)   //从index的位置开始删除一个
        },


        //注册功能
        signUp: function(){    //注册定义方法,按照官方文档关键AV.user
            let user = new AV.User()  //AV.user的实例,都储存在这个里面
            user.setUsername(this.formData.username) //将在表单用户输入的username存入数据库
            user.setPassword(this.formData.password)

            // user.signUp().then(function(loginedUser){
            //     console.log(loginedUser)
            // },function(error){
            // })

            //then箭头函数括号里的参数是then前面的执行函数user.signUp()返回对象.
            user.signUp().then((loginedUser) => {     //user.signUp().then((loginedUser)...当注册后返回loginedUser,并执行剪头函数.注意then必须前面要返回值或者错误才会执行 
                this.currentUser = this.getCurrentUser()  //这里使用箭头函数,方便使用this。 给currentUser赋值为this.getCurrentUser()
            },(error)=>{
                alert('注册失败')
            })
        },

        // login: function(){
        //     AV.User.logIn(this.formData.username,this.formData.password).then(function(loginedUser){
        //         console.log(loginedUser)
        //     },function(error){               
        //     })
        // }


        //登录功能
        login: function(){
            AV.User.logIn(this.formData.username,this.formData.password).then((loginedUser)=>{
                this.currentUser = this.getCurrentUser()
                console.log(this.getCurrentUser())
            },function(error){
                alert('登录失败')
            })
        },

        //判断登陆状态
        getCurrentUser: function(){   //验证是否已经登录,已经登录的话隐藏注册登录窗口
            // let {id,createAt,attributes: {username}} = AV.User.current()  //语法:链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
            // return {id,username,createAt}  //语法: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0

            let current = AV.User.current()
            console.log(current)
            if(current){
                let {id,createAt,attributes: {username}} = current //ES6解构赋值 将对象current里的值赋给前面的变量名
                //attributes: {username}  attributes的username属性
                return {id,createAt,username}
            }else{
                return null
            }
        },

        //登出功能
        logout: function(){         //登出功能
            AV.User.logOut()
            this.currentUser = null
            window.location.reload()   //相当于页面刷新按钮
        }
    }
})







