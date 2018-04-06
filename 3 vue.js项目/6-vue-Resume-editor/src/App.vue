 主组件

<template>
  <div>
    <p>{{text}}</p>
    <Topbar/>       <!-- 引入三个组件标签 -->
    <ResumeEditor/>
    <ResumePreview/>  

  </div>
</template>

<script>
import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

import './assets/reset.css'

export default {
  name: 'app',
  data: function () {
    return {
      text: '你好'
    }
  },
  components: {Topbar,ResumeEditor,ResumePreview}
}
</script>

<style>

</style>
