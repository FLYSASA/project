<template>
  <div id="resumePreview">
      <section data-name="profile" v-show="resume.profile">
          <h1>{{resume.profile['姓名']}}</h1>
          <h2>{{resume.profile['职位']}}</h2>
          <p>
              <small>{{resume.profile['城市']}}</small>
              <small>{{resume.profile['出生年月']}}</small>
          </p>
      </section>

      <section data-name="projects" v-show="resume.projects">
          <h2>项目经历</h2>
          <ol>
              <li v-for="item in resume.projects">
                  <h3>{{item['项目名称']}}</h3>
                  <p v-show="item['项目内容']">{{item['项目内容']}}</p>
              </li>
          </ol>
      </section>

      <section data-name="workHistory" v-show="resume.workHistory">
          <h2>工作经历</h2>
          <ol>
              <li v-for="item in resume.workHistory">
                  <h3>{{item['公司']}}</h3>
                  <p v-show="item['工作内容']">{{item['工作内容']}}</p>
              </li>
          </ol>
      </section>

      <section data-name="awards" v-show="resume.awards">
          <h2>获奖情况</h2>
          <ol>
              <li v-for="item in resume.awards">
                  <h3>{{item['荣获奖项']}}</h3>
                  <p v-show="item['奖励内容']">{{item['奖励内容']}}</p>
              </li>
          </ol>
      </section>  

      <section data-name="education" v-show="resume.education">
          <h2>毕业院校</h2>
          <ol>
              <li v-for="item in resume.education">
                  <h3>{{item['学校']}}
                      <span v-show="item['学位']">- {{item['学位']}}</span>
                  </h3>
              </li>
          </ol>
      </section>

      <section data-name="contacts" v-show="resume.contacts">
          <h2>联系方式</h2>
          <table>
              <tr v-for="item in resume.contacts">
                  <td>{{item['联系方式']}}</td>
                  <td v-show="item['号码']">{{item['号码']}}</td>
              </tr>
          </table>
      </section>

      
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

<style lang="scss">
    #resumePreview{
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        padding: 2em;
        color: #333;
        line-height: 1.2;
        overflow: auto;  //可滚动
        *{box-sizing: border-box;font-variant: normal;font-weight: normal;}
        ol{list-style: none;}
        section + section{margin-top: 2em;}
        p{ white-space: pre-line;} //合并空白符序列，但是保留换行符,意思是文本在html里换行,在页面上也可以换行。
        section {
            > h2:first-child{background: #ddd;display: inline-block;padding: .2em;margin-bottom: .5em;border-radius: 5px;}
        }
        section[data-name="profile"]{
            >h1{margin: .1em 0; font-size: 4em;}
        }
        section[data-name="workHistory"],
        section[data-name="projects"],
        section[data-name="awards"]{
            li + li {margin-top: 1em;}
            li {
              h3{ border-bottom: 1px solid #999; padding-bottom: .3em; margin-bottom: .3em; }
            }
        }
        section[data-name="education"]{
            li{
                line-height: 1.5;
            }
        }
        section[data-name="contacts"]{
            td:first-child{
                padding-right: 1em;
            }
        }
    }
</style>

