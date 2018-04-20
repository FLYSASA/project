<template>
  <div class="action">
      <form @submit.prevent="signUp">
          <div class="row">
              <label>用户名:</label>
              <input type="text" v-model="formData.username" required>
          </div>
          <div class="row">
              <label>密码:</label>
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
import getAVUser from '../lib/getAVUser'
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
  methods: {
      //注册 参考:https://leancloud.cn/docs/leanstorage-started-js.html#hash-814093878
      signUp(){
          let {username,password} = this.formData  //解构赋值,赋给变量username,password
          var user = new AV.User()
          user.setUsername(username)
          user.setPassword(password)
          user.signUp().then(() => {   
              //注册成功触发父组件success事件
              this.$emit('success',getAVUser())
          },(error)=>{
              this.errorMessage = getErrorMessage(error)
          })
      }
  }
}
</script>

<style lang="scss">
.action{
    margin: 0  auto;
    .row{
        margin: 15px;
        label{
            display: inline-block;
            width: 4rem;
        }
        input{
            padding: 3px;
            border: 1px solid rgb(184, 183, 183);
            border-radius: 4px;
            width: 10rem;
        }
    }
    .actions{
        margin: 0 auto;
        text-align: center;
        input{
            cursor: pointer;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            color: #fff;
            background: #67C23A;
            margin-top: 10px;
            &:hover{
                background: rgb(87, 168, 47);
            }
        }
        .errorMessage{
            color: #F56C6C;
        }
    }
}
</style>


