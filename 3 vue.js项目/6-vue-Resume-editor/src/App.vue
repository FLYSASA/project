 主组件

<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>

import 'normalize.css/normalize.css'  //默认样式在各个平台一样
import './assets/reset.css'           //将某些默认样式重置掉,与上面不冲突,但是这个顺序在后面

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
import icons from './assets/icons'   //引入经过图标脚本合并过的icons.js

import store from './store/index'    //引入store库

export default {
  store,                             //Vuex通过store选项,提供一种机制将状态从根组件App.vue,注入到每一个子组件中(需调用 Vue.use(Vuex)).
  name: 'app',
  
  components: {Topbar,ResumeEditor,ResumePreview},
  created(){
    //element.insertAdjacentHTML(position, text); afterBegin：在该元素第一个子元素前插入
    document.body.insertAdjacentHTML('afterbegin',icons)   //使用脚本将图标插入到body中,insertAdjacentHTML 插入HTML:http://www.css88.com/archives/5040

    //从云端localStorage获取state
    let state = localStorage.getItem('state')
    if(state){
      state = JSON.parse(state)   //将数据字符串化
    }
    this.$store.commit('initState',state)   //通过commit改变本地store里的state
  }
}
</script>

<style lang="scss">
  .page{
    height: 100vh;    //占满整个屏幕
    display: flex;
    flex-direction: column;
    background: #EAEBEC;
  
    >main{
      flex-grow: 1;      //占满剩余空间
    }
    >main{
      min-width: 1024px;
      max-width: 1440px;
      margin: 0;
      margin-top: 16px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;        /* 记得加width  */
      align-self: center;
    }
  }

  #topbar{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    height: 64px;
  }
  #resumeEditor{
    min-width: 35%;    //使用width: 35%;因为flex,所以右边会挤压左边
    background: #444;
  }

  #resumePreview{
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }

  svg.icon{            //symbol iconfont属性
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }

</style>
