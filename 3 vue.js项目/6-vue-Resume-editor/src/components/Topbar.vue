<template>
  <div id="topbar">
    <div class="wrapper">
        <span class="logo">Resumer</span>
        <div class="actions">
          <button class="primary">保存</button>
          <button>预览</button>
        </div>
    </div>
 </div>
</template>

<script>
export default {
  name: "Topbar" //name作用: 1.Topbar相当于一个全局Id 2.可以不写 3.写了可以提供更好的调试信息  参见https://cn.vuejs.org/v2/api/#name
};
</script>

<style scoped lang="scss"> //scoped功能: https://cn.vuejs.org/v2/guide/comparison.html#HTML-amp-CSS
    #topbar{
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
      >.wrapper{
        min-width: 1024px;
        max-width: 1440px;
        margin: 0 auto;
        height: 64px;
      }
      >.wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
      }
      .logo{
        font-size: 24px;
        color: #000;
      }
    }

    button{  //由于加了scoped,所以这个button选择器只在本组件内有效,不会影响其它组件
      width: 72px;
      height: 32px;
      border: none;
      cursor: pointer;
      font-size: 18px;   //设计稿是20px,看起来太大,就改成18px了
      background: #ddd;
      color: #222;
      border-radius: 5px;
      &:hover{  //&连体符,替代button :https://www.w3cplus.com/preprocessor/use-ampersand-in-selector-name-with-Sass.html
        box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);;  //hela:css3 http://www.css88.com/book/css/values/color/hsla.htm
      }
      &.primary{
        background: #02af5f;
        color: white;
      }
    }
</style>
