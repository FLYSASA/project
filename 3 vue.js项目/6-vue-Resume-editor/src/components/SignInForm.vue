<template>
    <div class="action">
        <form @submit.prevent="signIn">
            <div class="row">
                <label>用户名</label>
                <input type="text" required v-model="formData.username">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="password" required v-model="formData.password">
            </div>
            <div class="actions">
                <input type="submit" value="登录">
                <span class="errorMessage">{{errorMessage}}</span>
            </div>
        </form>
    </div>
</template>

<script>
  //引入
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'SignInform',
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods: {
        signIn(){
            let {username,password} = this.formData
            AV.User.logIn(username,password).then(()=>{
                this.$emit('success',getAVUser())
            },(error) => {
                this.errorMessage = getErrorMessage(error)
            })
        }
    }
  }

</script>
