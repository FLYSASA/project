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
import AV, { Query } from 'leancloud-storage'  //引入leanclound-storage AV 存储

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
        newTodo: '',   //todo输入框的内容
        todoList: [],  //数据是{newTodo,创建时间,done}属性的集合

        currentUser: null    //判断用户是否登录，初始为null,即false
        //当currentUser = this.getCurrentUser() =>return {id,createAt,username},不为null即是true
    },

    //获取user的AllTodos
    created: function () {
        this.currentUser = this.getCurrentUser()  //this.getCurrentUser()即返回的三个值id,createAt.className
        if(this.currentUser){
            var query = new AV.Query('AllTodos')  //不需要id也能获取到对象
            query.find()
            .then(function(todos){
                //绑定id
                let avAllTodos = todos[0]  //理论上AllTodos只有一个,我们取结果的第一项
                let id = avAllTodos.id
                //获取该id下的content数据,并转成字符串
                this.todoList = JSON.parse(avAllTodos.attributes.content)  //content: "[{"title":"222","createAt":"2018/4/5 上午1:13:13","done":false}]"
                //给这个总备忘录一个id 与 那边对应
                this.todoList.id = id 
            },function(error){
                console.log(error)
            })
        }

        this.fetchTodos()   //重新登录后,显示之前存储的todo
    },
    methods: {
        fetchTodos: function(){
            if(this.currentUser){
                var query = new Query('AllTodos')
                query.find()
                .then((todos) => {
                    let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
                    let id = avAllTodos.id
                    this.todoList = JSON.parse(avAllTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
                    this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
                },function(error){
                    console.log(error)
                })
            }
        },
        updateTodos: function(){
            //如何更新对象https://leancloud.cn/docs/leanstorage_guide-js.html#hash810954180
            let dataString = JSON.stringify(this.todoList)  //json序列化有id属性的数组
            // 将avTodos与AllTodos关联,第一个参数是 className，第二个参数是 objectId
            let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id) //假如 id 已知，则可以通过如下接口从本地构建一个 AV.Object 来更新这个对象
            avTodos.set('content',dataString)   //set与save总是前后出现
            avTodos.save().then(()=>{
                console.log('更新成功')
            })

        },
        //储存数据到远端,只有在登录和注册时候才会触发
        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList)  //将数组todoList JSON化
            var AVTodos = AV.Object.extend('AllTodos')
            var avTodos = new AVTodos()

            //添加访问权限控制:https://leancloud.cn/docs/acl-guide.html#hash-1171845695
            var acl = new AV.ACL() 
            acl.setReadAccess(AV.User.current(),true)  //AV.User.current()是当前用户,当前用户才有读取权限
            acl.setWriteAccess(AV.User.current(),true)  //写的权限

            avTodos.setACL(acl)  //设置访问控制
            avTodos.set('content',dataString)     //添加新增内容
            avTodos.save().then(function(todo){  //todo因为不断被set新的内容不断被更新数据

                //一定要把id挂到 this.todoList上,否则下次就不会调用updateTodos了
                this.todoList.id = todo.id    //
                alert('保存成功')
            },function(error){
                alert('保存失败')
            })
        },

        saveOrUpdateTodos: function(){
            if(this.todoList.id){   //有了id说明已经跑了一遍saveTodos了(已创建好初步类表),不能再跑第二遍,所以执行updateTodos
                this.updateTodos()
            }else{                      //第一次创建todo,返回todo对象,将todo.id 赋给this.todoList,这样this.todoList有了值,下次将会执行更新函数
                this.saveTodos()        //意思是saveTodos仅执行一次(创造了一个className),第二次便执行更新todos,因为不需要重新创建AllTodos了
            }
        },

        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,  //这里面的属性都是todo的
                createAt:(new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                done: false //添加一个done属性,绝对是否让已完成显示
            })
            this.newTodo = ''   //newTodo被添加到数组里后,一定要重置,否则newTodo更新,会影响数组里的数据变化
            this.saveOrUpdateTodos() // 不能用 saveTodos 了
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)  //这个todo是正在遍历的这个
            this.todoList.splice(index,1)   //从index的位置开始删除一个
            this.saveOrUpdateTodos() // 不能用 saveTodos 了
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
            },function(error){
                alert('登录失败')
            })
        },

        //判断登陆状态
        getCurrentUser: function(){   //验证是否已经登录,已经登录的话隐藏注册登录窗口
            // let {id,createAt,attributes: {username}} = AV.User.current()  //语法:链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
            // return {id,username,createAt}  //语法: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0

            let current = AV.User.current()  //当前用户: https://leancloud.cn/docs/leanstorage_guide-js.html#hash748191977
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







