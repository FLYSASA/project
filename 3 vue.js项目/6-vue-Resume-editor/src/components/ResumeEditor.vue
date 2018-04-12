<template>
  <div id="resumeEditor">
      <nav>
          <ol>
            <!-- resume.config是一个包含图标信息的数组,每一项有field(用于判断是否赋给li active属性)和icon(svg图标显示)属性. -->
            <li v-for="(item,index) in resume.config"   
               :class="{active: item.field === selected}"
                @click="selected = item.field">   <!-- 点击赋给该图标active属性 -->
                    <svg class="icon">
                        <use :xlink:href="`#icon-${item.icon}`"></use>    <!-- ${}占位符 -->
                    </svg> 
            </li>
          </ol>
      </nav>
      <ol class="panels">
          <li v-for="item in resume.config" v-show="item.field === selected">  <!-- 显示左侧图标被点击对应的panel -->
                <!-- 分情况,看panel对应的data是否是数组,因为有的是数组有的是对象 -->
              <div v-if="resume[item.field] instanceof Array">   <!-- 是Array的实例 -->
                  <div class="subitem" v-for="subitem in resume[item.field]">  <!-- 通过item.field 找到data -->
                      <div class="resumeField" v-for="(value,key) in subitem" >  <!-- subitem是数组中的某一项,如education里的第一项. -->
                          <label> {{key}} </label>
                          <input type="text" :value="value">  <!-- 绑定值 双引号里面的value对应data里面的数据 -->
                      </div>
                      <hr>
                  </div>
              </div>
              <!-- data是对象 -->
              <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label>{{key}}</label>
                    <input type="text" v-model="resume[item.field][key]">
              </div>
          </li>
          <li>
              {{count}}
              <button @click="add">test</button>
          </li>
      </ol>
  </div>
</template>

<script>
export default {
  name: 'ResumeEditor',
  data: function(){
      return {
            selected: 'profile',  //默认显示第一个tab,selected用于计算是否与item.field相等.求得布尔值.
            resume: {
                config: [
                    { field: 'profile', icon: 'id' },
                    { field: 'work history', icon: 'work' },
                    { field: 'education', icon: 'book' },
                    { field: 'projects', icon: 'heart' },
                    { field: 'awards', icon: 'cup' },
                    { field: 'contacts', icon: 'phone' }
                ],
                profile: {
                    name: '',
                    city: '',
                    title: ''
                },
                'work history' : [
                    {company: 'AL', content: '我的第二份工作是'},
                    {company: 'TX', content: '我的第一份工作是'}                  
                ],
                education: [
                    { school: 'AL', content: '文字' },
                    { school: 'TX', content: '文字' },                   
                ],
                projects: [
                    { name: 'project A', content: '文字' },
                    { name: 'project B', content: '文字' },   
                ],
                awards: [
                    { school: 'awards A', content: '文字' },
                    { school: 'awards B', content: '文字' },  
                ],
                contacts: [
                    { contact: 'phone', content: '13812345678' },
                    { contact: 'qq', content: '12345678' },  
                ]
            }
      }
  },
  computed: {
      count (){
          return this.$store.state.count
      }
  },
  methods: {
      add(){
          this.$store.commit('increment')
      }
  }
}
</script>

<style lang="scss" scoped>
    #resumeEditor{
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        display: flex;
        flex-direction: row;
        overflow: auto;   //滚动条
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
            flex-grow: 1;    //占满剩余空间
            > li{
                padding: 24px;
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
            box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.25);
            width: 100%;
            height: 40px;
            padding: 0 8px;
        }
    }
    hr{
        border: none;
        border-top: 1px solid #ddd;
        margin: 24px 0;
    }
</style>



