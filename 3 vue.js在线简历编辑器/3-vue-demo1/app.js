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
            window.localStorage.setItem('myData',dataString)           
        })
        let oldDataString = window.localStorage.getItem('myData')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []
    },
    methods: {
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,  //这里面的属性都是todo的
                createAt: new Date(),
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



