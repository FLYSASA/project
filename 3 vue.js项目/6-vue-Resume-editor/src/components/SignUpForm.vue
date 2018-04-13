<template>
  <div>
      <form @submit.prevent="signUp">
          <div class="row">
              <label>用户名</label>
              <input type="text" v-model="formData.username" required>
          </div>
          <div class="row">
              <label>密码</label>
              <input type="password" v-model="formData.password" required>
          </div>
          <div class="actions">
              <input type="submit" value="提交">
              <span class="errorMessage">{{errorMessage}}</span>
          </div>
      </form>
  </div>
</template>

<script>
import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
export default {
  name: 'SignUpForm',
  data(){
      return {
          formData:{
              username: '',
              password: ''
          },
          errorMessage: ''
      }
  },
  created(){

  },
  methods: {
      //注册 参考:https://leancloud.cn/docs/leanstorage-started-js.html#hash-814093878
      signUp(){
          let {username,password} = this.formData  //解构赋值,赋给变量username,password
          var user = new AV.User()
          user.setUsername(username)
          user.setPassword(password)
          user.signUp().then((loginedUser) => {   //loginedUser登录后返回的对象
              //注册成功触发父组件success事件
              this.$emit('success',{
                  username: loginedUser.attributes.username,
                  id: loginedUser.id
              })
          },(error)=>{
              this.errorMessage = getErrorMessage(error)
          })
      }
  }
}
</script>

