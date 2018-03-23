define(['jquery'],function($){   /* ['']里面的路径是相对于定义的baseUrl */
    function Gotop($ct){
      this.$ct = $ct
      this.target = $('<span class="gotop">Gotop</span>')
      this.createNode()
      this.bindEvent()
    }
    
    Gotop.prototype = {
      createNode: function(){      
        this.$ct.append(this.target)
        this.target.hide()
      },
    
      bindEvent: function(){
        var _this = this
        $(window).scroll(function(){
          var scrollTop =  $(window).scrollTop()  /* scrollTop()返回或设置匹配元素的滚动条的垂直位置。 */
          if(scrollTop > 20){
            _this.target.show()
          }else{
            _this.target.hide()
          }
        })
        _this.target.on('click',function(){
          $(window).scrollTop(0)
        })
      }
    }
    return Gotop
})
