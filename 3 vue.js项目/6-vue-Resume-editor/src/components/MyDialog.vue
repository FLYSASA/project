<template>
  <div class="dialogWrapper" v-show="visible">  <!-- 当visible为true显示 -->
      <div class="dialog">
          <header>
              {{title}}
              <span class="close" @click="close">X</span>  <!-- 点x的时候触发父组件的close事件 -->
          </header>
          <main>
              <slot></slot>   <!-- 用来放置父组件内子组件标签里的内容 -->
          </main>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: ['title','visible'],   //可以使用变量title,visible,这两个变量都来自父组件中子组件标签的自定义属性
  methods: {
      close(){
          this.$emit('close')   //子组件触发绑定在Vue实例上的自定义事件   this.$emit()触发实例上的事件
          //父组件通过v-on:事件名="事件" ,监听自定义事件  这里是: @close="signUpDialogVisibel = false"
          //子组件通过this.$emit('事件名')触发父组件的事件.
          //参考:https://cn.vuejs.org/v2/guide/components.html#非父子组件的通信
      }
  }
}
</script>

<style scoped lang="scss">
    .dialogWrapper{
        position: fixed;
        background: hsla(0, 0%,0%,0.25);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .dialog{
            background: #fff;
            min-height: 4em;
            min-width: 10em;
            > header{
                padding: 16px;
                display: flex;
                justify-content: space-between;
            }
            > main{
                padding: 16px;
            }
        }
    }

</style>


