<template>
  <div id="topbar">
    <div class="wrapper">
        <span class="logo">Resumer</span>
        <div class="actions">
            <div v-if="logined" class="userActions">
                <span class="welcome">你好,{{user.username}}</span>
                <a href="#" class="button" @click.prevent="signOut">登出</a>
            </div>

            <div v-else class="userActions">
                <!-- 点击注册按钮,@click.prevent阻止默认跳转,并将signUpDialogVisible = true, 此时visible = true,mydialog显示-->
                <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>             
                <a href="#" class="button" @click.prevent="signInDialogVisible = true">登录</a>
            </div>
            <button class="button primary hold" >保存</button>
            <button class="button watch" @click="preview">预览</button>
        </div>
    </div>
    <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <!-- 登录表单 -->
      <SignUpForm @success="signIn($event)" />
      <!-- 在父组件中子组件标签里写内容的话,会放在子组件的slot标签内,如果子组件没有slot标签就会被舍弃 -->
      <!-- $event是特殊变量 这里指的是this.$emit传递的参数对象 -->
      <!-- $event.target 获取绑定success事件的元素 -->
    </MyDialog>
    <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
      <SignInForm @success="signIn($event)"/>
    </MyDialog>
 </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import AV from '../lib/leancloud'
export default {
  name: "Topbar", //name作用: 1.Topbar相当于一个全局Id 2.可以不写 3.写了可以提供更好的调试信息  参见https://cn.vuejs.org/v2/api/#name
  data(){
    return {
      signUpDialogVisible: false,
      signInDialogVisible: false,
    }
  },
  computed: {
    user(){
      return this.$store.state.user  //获取store库里的user赋给变量user
    },
    logined(){
      return this.user.id
    }
  },
  components: {
    MyDialog,SignUpForm,SignInForm
  },
  methods: {
    signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')
    },
    //注册成功后触发父组件的登录事件
    signIn(user){   //user = $event ,全局可以通过this.user访问到
      console.log(user)
      this.signInDialogVisible = false      //隐藏注册对话框
      this.$store.commit('setUser',user)   //改变state状态的唯一办法是提交commit,两个参数一个是 store中对应的mutations下的方法名,一个是提交载荷即参数对象
      //触发store里面的setUser方法,并传递参数user
    },
    preview(){
      this.$emit('preview')
    }
  }
};
</script>

<style scoped lang="scss"> //scoped功能: https://cn.vuejs.org/v2/guide/comparison.html#%E7%BB%84%E4%BB%B6%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%86%85%E7%9A%84-CSS
    #topbar{
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
      >.wrapper{
        min-width: 1024px;
        max-width: 1440px;
        margin: 0 auto;
        height: 64px;    //8的倍数
      }
      >.wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        .actions{
          button.watch{
            margin-left: 5px;
            border: 1px solid #eee;
            background: none;
          }
        }
      }
      .logo{
        font-size: 24px;
        color: #000;
      }
    }

    .button{  //由于加了scoped,所以这个button选择器只在本组件内有效,不会影响其它组件
      width: 72px;
      height: 32px;
      border: none;
      cursor: pointer;
      font-size: 18px;   //设计稿是20px,看起来太大,就改成18px了
      border: 1px solid #eee;
      color: #222;
      border-radius: 5px;
      text-decoration: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      &:hover{  //&连体符,替代button :https://www.w3cplus.com/preprocessor/use-ampersand-in-selector-name-with-Sass.html
        box-shadow: 1px 1px 3px hsla(0, 0, 0, 0.20);  //hela:css3 http://www.css88.com/book/css/values/color/hsla.htm
      }
      &.primary{
        background: #02af5f;
        color: white;
      }
    }
    .actions{
        display: flex;
        .userActions{
          margin-right: 3em;
          .welcome{
            margin-right: .5em;
          }
        }
    }
</style>
