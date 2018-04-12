import Vuex from 'vuex'
import Vue from 'vue'
 
Vue.use(Vuex)   //Vuex从根组件将store注入到子组件需要 Vue.use(Vuex)

export default new Vuex.Store({
   state: {
        selected: 'profile',  //默认显示第一个tab,selected用于计算是否与item.field相等.求得布尔值.
        resume: {
            config: [
                { field: 'profile', icon: 'id' },
                { field: 'workHistory', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' }
            ],
            profile: {
                name: '',
                city: '',
                birthday: '',
                title: ''
            },
            workHistory : [
                {company: 'xx集团', content:   //需要用反撇号
                `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化定制。
                我的主要工作如下:
                1. 完成既定产品需求。
                2. 修复 bug。
                `
                },
                {company: 'xx集团', content: 
                `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化定制。
                我的主要工作如下:
                1. 完成既定产品需求。
                2. 修复 bug。
                `
                }                             
            ],
            education: [
                { school: '中山', content: '本科' },
                { school: '热血高中', content: '文字' },                   
            ],
            projects: [
                { name: 'project A', content: '文字' },
                { name: 'project B', content: '文字' },   
            ],
            awards: [
                { name: '荣耀大奖', content: '获得再来一瓶奖励' },
                { name: 'awards B', content: '文字' },  
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