var EventCenter = {
    on: function(type,handler){
        $(document).on(type,handler)
    },
    fire: function(type,data){
        $(document).trigger(type,data)
    }
}

//footer区域函数封装

var Footer = {
    init: function(){
        this.$footer = $('footer')
        this.$leftBtn = this.$footer.find('.icon-left')
        this.$rightBtn = this.$footer.find('.icon-right')
        this.$ul = this.$footer.find('ul')
        this.$box = this.$footer.find('.box')

        this.isAnimate = false
        this.isToStart = true
        this.isToEnd = false

        this.bind()
        this.render()
    },

    bind: function(){
        var _this = this                         //一般bind里面最好加上这一句,因为绑定对象多变

        this.$rightBtn.on('click',function(){    //由于是点击事件,所以页面渲染后才执行,所以此时有li
            var itemWidth = _this.$box.find('li').outerWidth(true)
            var rowCount = Math.floor(_this.$box.width()/itemWidth)   //Math.floor保证每次移动整数个li,左边贴顶
            if(_this.isAnimate) return;
            if(!_this.isToEnd){
                _this.isAnimate = true                         //状态锁住,如果移动一次后不将锁解开,将无法再次移动
                _this.$ul.animate({                         //使用animate移动一定要记得将移动元素的位置设置为position:absolute
                    left: '-='+itemWidth*rowCount
                },400,function(){
                    _this.isToStart = false                    //指示可以左移了
                    _this.isAnimate = false                    //解锁
                    if(parseFloat(_this.$box.width())-parseFloat(_this.$ul.css('left')) >= parseFloat(_this.$ul.width())){
                        _this.isToEnd = true                     //设定条件终止,因为带单位的值不能直接相加减(得到NaN)所以需要parseFloat转为数值,获取left的值可以用.css('left')
                    }
                })
            }
        })

        this.$leftBtn.on('click',function(){
            var itemWidth = _this.$box.find('li').outerWidth(true)
            var rowCount = Math.floor(_this.$box.width()/itemWidth)
            if(_this.isAnimate) return;
            if(!_this.isToStart){
                _this.isAnimate = true
                _this.$ul.animate({
                    left: '+='+itemWidth*rowCount
                },400,function(){
                    _this.isToEnd = false
                    _this.isAnimate = false
                    if(parseFloat(_this.$ul.css('left')) >= 0){
                        _this.isToStart = true
                    }
                })
            }
        })

        this.$footer.on('click','li',function(){
            $(this).addClass('active').siblings().removeClass('active')

            EventCenter.fire('select-album',{                      //给main区域发送数据,这里$(this)指的是被点击的li
                channelId: $(this).attr('data-channel-id'),          //获取自定义data-channel-id属性的值,不直接发送channel.channel_id是因为两个区域获取到的数据互不关联,但是可以根据html结构属性传递数据,所以接下来main区域第一件事是将监听到的fire数据作出函数行为
                channelName: $(this).attr('data-channel-name')
            })
        })
    },

    render: function(){
        var _this = this
        $.getJSON('//jirenguapi.applinzi.com/fm/getChannels.php')
            .done(function(ret){
                console.log(ret.channels)
                _this.renderFooter(ret.channels)
            }).fail(function(){
            console.log('error')
        })
    },

    renderFooter: function(channels){
        var html = ''
        channels.forEach(function(channel){    //传入参数channel即单个对象不再是数组，因为操作的是对象
            html +=
                '<li data-channel-id='+channel.channel_id+' data-channel-name='+channel.name+'>'
                +' <div class="cover" style="background-image: url('+channel.cover_small+')"></div>'
                +' <h3>'+channel.name+'</h3>'
                +' </li>'
        })
        this.$ul.html(html)   //不放在上面括号里的是因为html已经包含了所有频道，但此时ul我们需要排成一排所以，还要设置样式
        this.setStyle()       //注意即使对ul设置style也需要在this上绑定属性,不能直接在this.$ul上绑定
    },

    setStyle: function(){
        var itemWidth = this.$ul.find('li').outerWidth(true)
        var icont = this.$ul.find('li').length
        this.$ul.css({
            width: itemWidth*icont+'px'
        })
    }

}


//main区域函数封装
var Fm = {
    init : function(){
        this.$container = $('#page-music')
        this.audio = new Audio()
        this.audio.autoplay = true

        this.bind()              //同样在init上触发绑定事件
    },
    bind: function(){           //第一件绑定的事是对监听到的fire数据设定行为函数
        var _this = this
        EventCenter.on('select-album',function(e,channelObj){  //参数可以自定义因为之前是个对象,可以设置为channelObj
            _this.channelId = channelObj.channelId             //行为函数第一件事是将数据储存在this变量里面
            _this.channelName = channelObj.channelName

            _this.loadMusic()                                  //第二件事 触发事件
        })

        _this.$container.find('.aside .btn-play').on('click',function(){
            if($(this).hasClass('icon-pause')){
                $(this).removeClass('icon-pause').addClass('icon-play')
                _this.audio.pause()
            }else{
                $(this).removeClass('icon-play').addClass('icon-pause')
                _this.audio.play()
            }
        })

        _this.$container.find('.aside .btn-next').on('click',function(){
            _this.loadMusic()
        })


        _this.audio.addEventListener('play',function(){                //点击play事件后,监听并更新数据,
            clearInterval(_this.statusClock)                             //防止更新动作累积,如点击next键
            _this.statusClock = setInterval(function(){                  //因为下面的清除更新无法获取到函数所以需要赋给一个变量,暂存到this里
                _this.updateStatus()
            },1000)                                                      //每隔一秒更新状态
        })

        _this.audio.addEventListener('pause',function(){
            clearInterval(_this.statusClock)                             //关闭更新
        })

    },

    updateStatus: function(){
        var _this = this
        var min = Math.floor(this.audio.currentTime/60)
        var second = Math.floor(this.audio.currentTime%60)+''                 //取余数,注意当second的是个位数时候记得补个0,这里记得+''转成字符串
        second = second.length === 2?second:'0'+second                        //三元表达式,单个补0

        this.$container.find('.detail .current-time').text(min+':'+second)    //html 时间更新
        this.$container.find('.detail .bar-progress').css('width',_this.audio.currentTime/_this.audio.duration*100+'%')

        var line = this.lyricObj['0'+min+':'+second]               //前面0不能少,因为时间形式00:08
        if(line){
            this.$container.find('.lyric p').text(line).boomText()              //boomText()文字出场动画,注意这里的line和loadLyric里面的无关
        }
    },


    loadMusic: function(){     //loadMusic主要是用来获取点击li的channelid里面的歌曲数据,然后setMusic和loadLyric
        var _this = this         //获取歌曲数据,需要传递参数对象,{channel: channelId}
        console.log('load music...')
        $.getJSON('//jirenguapi.applinzi.com/fm/getSong.php',{channel: this.channelId}).done(function(ret){
            _this.song = ret['song'][0]
            _this.setMusic()
            _this.loadLyric()
        }).fail(function(){
            console.log('error')
        })
    },

    setMusic: function(){
        console.log('set music...')
        console.log(this.channelId)
        console.log(this.song)
        this.audio.src = this.song.url
        $('.bg').css('background-image','url('+this.song.picture+')')
        this.$container.find('.aside figure').css('background-image','url('+this.song.picture+')')
        this.$container.find('.detail h1').text(this.song.title)
        this.$container.find('.detail .author').text(this.song.artist)
        this.$container.find('.tag').text(this.channelName)
        this.$container.find('.btn-play').removeClass('icon-play').addClass('icon-pause')
    },

    loadLyric: function(){
        var _this = this
        $.getJSON('//jirenguapi.applinzi.com/fm/getLyric.php',{sid:_this.song.sid}).done(function(ret){
            console.log(ret)
            var lyric = ret.lyric           //过滤出ret中lyric数据,ret.lyric的值是字符串

            /*"[00:00.01]音乐来自百度FM, by 饥人谷\n
             \n
             [00:01.19]红颜旧\n
             [00:02.10](电视剧《琅琊榜》插曲)\n
             [00:04.22]
             [00:06.80]作词：袁亮  作曲：赵佳霖
             [00:08.77]演唱：刘涛
             [00:10.74]
             [00:29.03]西风夜渡寒山雨
             [00:35.33]家国依稀残梦里
             [00:41.79]思君不见倍思君
             [00:48.48]别离难忍忍别离
             [00:53.67]
             ...
             "*/
            var lyricObj = {}
            lyric.split('\n').forEach(function(line){          //lyric.split('\n') 以空格划分成数组,数组元素为每句歌词组成的字符串 ,line代表lyric.split('\n').forEach
                var times = line.match(/\d{2}:\d{2}/g)            //匹配每一行中的时间不需要秒, \d{2}匹配两位数, g全局匹配,  match()存放匹配结果的数组。
                //times == ['01:10.25', '01:20.25']
                var str = line.replace(/\[.+?\]/g,'')            //?表示匹配到第一个结束匹配 懒惰模式。 *代表{0,}　+代表{1,}　?代表{0,1}. 将时间替换成空
                if(Array.isArray(times)){                        //因为有可能times为空,则无法lyricObj[time] = str
                    times.forEach(function(time){
                        lyricObj[time] = str                         //time为属性,歌词为值
                    })
                }
            })
            _this.lyricObj = lyricObj                         //储存在this里,方便updateStatus()里调用,更新歌词信息
        })
    }

}
$.fn.boomText = function(type){                         //封装jQery字体动画插件,可以全局调用,写一个jquery插件很简单$.fn.+一个函数名,即可全局调用,调用$('p').boomText()
    type = type || 'rollIn'                               //动画需要引入<link rel="stylesheet" href="//cdn.bootcss.com/animate.css/3.5.2/animate.min.css">
    this.html(function(){                                 //this指的是$()jQuery选择器选择对象,.html即<p>hello  world</p>
        var arr = $(this).text()                            //arr是一个数组
            .split('').map(function(word){
                return '<span class="boomText">'+ word + '</span>'          //将p里面每个字都包裹一个span标签,然后就能对每一个span添加动画
            })
        return arr.join('')
    })

    var index = 0
    var $boomTexts = $(this).find('span')
    var clock = setInterval(function(){
        $boomTexts.eq(index).addClass('animated ' + type)
        index++
        if(index >= $boomTexts.length){
            clearInterval(clock)
        }
    }, 300)
}

Footer.init()
Fm.init()