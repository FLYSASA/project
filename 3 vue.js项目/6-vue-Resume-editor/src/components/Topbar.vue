<template>
  <div id="topbar">
      I am topbar
  </div>
</template>

<script>
export default {
  name: 'Topbar'    //name作用: 1.Topbar相当于一个全局Id 2.可以不写 3.写了可以提供更好的调试信息  参见https://cn.vuejs.org/v2/api/#name
}
</script>

<style>
    #topbar{
        color: green;
    }
</style>
