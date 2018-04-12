import Vuex from 'vuex'
import Vue from 'vue'
 
Vue.use(Vuex)   //Vuex从根组件将store注入到子组件需要 Vue.use(Vuex)

export default new Vuex.Store({
   state: {
        selected: 'profile',  //默认显示第一个tab,selected用于计算是否与item.field相等.求得布尔值.
        resume: {
            config: [
                { field: 'profile', icon: 'id' },
                { field: 'work history', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' }
            ],
            profile: {
                name: '',
                city: '',
                title: ''
            },
            'work history' : [
                {company: 'AL', content: '我的第二份工作是'},
                {company: 'TX', content: '我的第一份工作是'}                  
            ],
            education: [
                { school: 'AL', content: '文字' },
                { school: 'TX', content: '文字' },                   
            ],
            projects: [
                { name: 'project A', content: '文字' },
                { name: 'project B', content: '文字' },   
            ],
            awards: [
                { school: 'awards A', content: '文字' },
                { school: 'awards B', content: '文字' },  
            ],
            contacts: [
                { contact: 'phone', content: '13812345678' },
                { contact: 'qq', content: '12345678' },  
            ]
        }
   },
   mutations: {
     //payload是一个对象,在子组件中的set中作为参数传入
     switchTab(state,payload){      //mutations里面的事件(回调函数)会接受state作为第一个参数,payload是额外参数
         state.selected = payload   //关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
     }
   }
 })