<template>
  <div id="resumePreview">
      {{resume}}
  </div>
</template>

<script>
export default {
  name : 'ResumenPreview',
  computed: {    //获取store数据在compute计算属性中获取
      resume(){
          return this.$store.state.resume
      }
  }
}
</script>

<style>
    #resumePreview{
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25)
    }
</style>

