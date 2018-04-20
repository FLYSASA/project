import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'  //方便查找设置属性
 
Vue.use(Vuex)   //Vuex从根组件将store注入到子组件需要 Vue.use(Vuex)

export default new Vuex.Store({
   state: {
        selected: 'profile',  //默认显示第一个tab,selected用于计算是否与item.field相等.求得布尔值.
        user: {
            id: '',
            username: ''
        },
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
                姓名: '李明',
                城市: '深圳',
                出生年月: '1993.6',
                职位: '首席架构师'
            },
            workHistory : [
                {公司: 'xx集团', 工作内容:   //需要用反撇号
                `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化定制。
                我的主要工作如下:
                1. 完成既定产品需求。
                2. 修复 bug。
                `
                },
                {公司: 'xx集团', 工作内容: 
                `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化定制。
                我的主要工作如下:
                1. 完成既定产品需求。
                2. 修复 bug。
                `
                }                             
            ],
            education: [
                { 学校: '中山大学', 学位: '本科' },
                { 学校: '黄冈高中', 学位: '高中' },                   
            ],
            projects: [
                { 项目名称: 'project 1', 项目内容: '文字' },
                { 项目名称: 'project 2', 项目内容: '文字' },   
            ],
            awards: [
                { 荣获奖项: '荣耀大奖', 奖励内容: '获得再来一瓶奖励' },
                { 荣获奖项: '至尊大奖', 奖励内容: '两次再来一瓶奖励' },  
            ],
            contacts: [
                { 联系方式: 'phone', 号码: '13812345678' },
                { 联系方式: 'qq', 号码: '12345678' },  
            ]
        }
   },
   mutations: {
        initState(state,payload){
            Object.assign(state,payload)  //将payload所有可枚举属性复制到state
        },
            //payload是一个对象,在子组件中的set中作为参数传入
        switchTab(state,payload){      //mutations里面的事件(回调函数)会接受state作为第一个参数,payload是额外参数
            state.selected = payload   //关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
            localStorage.setItem('state',JSON.stringify(state))
        },
        updataResume(state,{path,value}){
            //所有的数据改动必需放在store里完成
            objectPath.set(state.resume,path,value)    //使用objectPath对象的set方法,将state.resume[path] = value
            //简化传参过程 path是字符串所以前面用反撇号
            localStorage.setItem('state',JSON.stringify(state)) //给本地存储创建'state'(key): state(value)
            //放在mutations里,是为了实现状态实时跟踪及存储至本地.
        },
        setUser(state,payload){
            Object.assign(state.user,payload)  //将payload中的键值对赋值到state.user
        },
        removeUser(state){
            state.user.id = ''
            state.resume = this.state.resume
        }
   }
 })