<template>
  <div id="resumeEditor">
      <nav>
          <ol>
            <!-- resume.config是一个包含图标信息的数组,每一项有field(用于判断是否赋给li active属性)和icon(svg图标显示)属性. -->
            <li v-for="(item,index) in resume.config"   
               :class="{active: item.field === selected}"
                @click="selected = item.field">   <!-- 点击赋给该图标active属性 -->
                    <svg class="icon">
                        <use :xlink:href="`#icon-${item.icon}`"></use>    <!-- ${}占位符 在js中不允许短横线存在,所以需要加引号`` -->
                    </svg> 
            </li>
          </ol>
      </nav>
      <ol class="panels">
          <li v-for="(item,index) in resume.config" v-show="item.field === selected">  <!-- 显示左侧图标被点击对应的panel -->
                <!-- 分情况,看panel对应的data是否是数组,因为有的是数组有的是对象 -->
              <div v-if="(resume[item.field] instanceof Array)">   <!-- 是Array的实例 -->
                  <div class="subitem" v-for="(subitem,i) in resume[item.field]">  <!-- 通过item.field 找到data -->
                      <div class="resumeField" v-for="(value,key) in subitem" >  <!-- subitem是数组中的某一项,如education里的第一项. -->
                          <label> {{key}} </label>
                          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`,$event.target.value)">  <!-- 绑定值 双引号里面的value对应data里面的数据 -->
                          <!-- 因为是数组所以需要比对象多遍历一次多一层${i} -->
                          <!-- ${}占位符需要加反撇号 -->     
                      </div>
                      <el-button v-on:click="delExp(item)" class="delete-btn" type="primary" icon="el-icon-delete" ></el-button>
                      <hr>
                  </div>
                  <el-button class="add-btn" v-on:click="addExp(item)" type="primary" >添加</el-button>
              </div>
              <!-- data是对象 这里指profile -->
              <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label>{{key}}</label>
                    <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`,$event.target.value)"> <!-- 只有用户输入就触发事件changeResumeField -->
              </div>
          </li>
      </ol>
  </div>
</template>

<script>
export default {
  name: 'ResumeEditor',
  
  computed: {    //计算属性
      selected: {
          //让数据可写: https://cn.vuejs.org/v2/guide/computed.html#计算属性的-setter
          //默认只有getter只能读数据
          get(){
              //文档: https://vuex.vuejs.org/zh-cn/state.html
              //获取储存在store里面的selected属性,子组件使用this.$store.state.属性名  
              return this.$store.state.selected   
          },
          //需要写数据时需要setter
          set(value){
              //子组件调用store里面的mutations内的事件,  需使用 this.$store.commit('函数名',传入参数)
              return this.$store.commit('switchTab',value)   //value = payload
          }
      },
      resume(){
          return this.$store.state.resume     //获取resume属性,将computed计算后的属性赋给变量resume
      }
  },
  methods: {
      changeResumeField(path,value){   //传入的值分别对应上面: item.field('profile等'),  key('profile对象内的name等属性'), $event.target.value(触发input事件的输入框的输入值)
          this.$store.commit('updataResume',{    //提交到mutations,改变state
              path,
              value
          })
      },
      delExp(item,i){ 
          if(this.resume[item.field].length > 1){
            this.resume[item.field].splice(i,1) 
          }               
      },
      addExp(item){
          let keys = Object.keys(this.resume[item.field][0]) //借助Object.keys方法获取所有key(属性),得到数组
          const empty = {}        //将属性赋给一个空对象,并配上属性值为空
          keys.map((key) => {
              empty[key] = ''
          })
          this.resume[item.field].push(empty)
      }
  }
}
</script>

<style lang="scss">
    #resumeEditor{
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        display: flex;
        flex-direction: row;
        >nav{
            width: 80px;
            background: black;
            color: white;
            >ol {
                >li {
                    height: 48px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 16px;
                    margin-bottom: 16px;
                    &.active{
                        background: white;
                        color: black;
                    }
                }
            }
        }
        > .panels{
            overflow: auto;   //滚动条
            flex-grow: 1;    //占满剩余空间
            > li{
                padding: 24px;
                position: relative;
                .subitem{
                    position: relative;
                    &:nth-child(1) .delete-btn{
                        display: none;
                    }
                    .delete-btn{
                        background: rgb(247, 102, 102);
                        padding: 4px 8px;
                        border: none;
                        position: absolute;
                        right: 0;
                        top: -2px;
                        &:hover{
                            background: rgb(250, 63, 63);
                        }
                    }                  
                }
                .add-btn{
                    position: absolute;
                    background: #44b681;
                    bottom: 0;
                    right: 24px;
                    padding: 8px 15px;
                    border: none;
                    margin-bottom: 10px;
                    &:hover{
                        background: #02af5f;
                    }
                } 
            }
        }
        svg.icon{
            width: 24px; // 原设计稿 32px 不好看，改成 24px
            height: 24px;
        }
    }
    ol{
        list-style: none;
    }
    .resumeField{
        > label{
            display: block;
        }
        input[type=text]{
            margin: 16px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow:inset 0 1px 3px 0 rgba(73, 73, 73, 0.25);
            width: 100%;
            height: 40px;
            padding: 0 8px;
        }
    }
    hr{

        border-top: 1px solid #ddd;
        margin: 24px 0;
    }
</style>



