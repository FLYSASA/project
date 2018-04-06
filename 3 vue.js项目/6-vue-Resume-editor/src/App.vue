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

import 'normalize.css/normalize.css'
import './assets/reset.css'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

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
  .page{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #EAEBEC;
  }

  #topbar{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    height: 64px;
  }
  .page>main{
    flex-grow: 1;   /*  一个人分配整个空间 */
    min-width: 1024px;
    max-width: 1440px;
    margin: 0;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-around;
    width: 100%;        
    align-self: center;   /* flex布局中justify-content和align-items都用于父容器,子元素自身调整需要align-self */
   
  }

  #resumeEditor{
    width: 35%;
    background: #444;
  }

  #resumePreview{
    width: 61.66667%;
    background: #777;
  }

</style>
