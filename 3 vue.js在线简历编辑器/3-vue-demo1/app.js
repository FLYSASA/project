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
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
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
        this.newTodo = oldnewData
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
            const index = this.todoList.indexOf(todo)  
            this.todoList.splice(index,1)   //从index的位置开始删除一个
        }
    }
})



