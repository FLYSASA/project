define(['jquery'], function($){

	function NewsFormate($targets, $button){
	 		this.$targets = $targets                 //news 放置所有新闻的区域
	 		this.$button = $button                   //更多按钮
	 		this.init()
	 		this.bind()

	 	}

	 	NewsFormate.prototype.init = function(){
	 		this.curPage = 1,            //获取第一段数据
        	this.perPageCount = 8        //每次获取的数据个数

        	
	 		this.sumHeightArr = [],      //瀑布流经典套路,定义一个元素是一排items高度的数组
			nodeWidth = this.$targets.find('.item').outerWidth(true),
			colLength = parseInt( this.$targets.width() / nodeWidth );

			for(var i=0; i<colLength; i++){
				 	this.sumHeightArr.push(0)   //数组初始数据是0,0的个数是一排放下的列数
				 }

		 	this.loadNews()	                //初次加载页面
	 	} 	
	 	

	 	NewsFormate.prototype.bind = function(){
	 		var _this = this
	 		this.$button.on('click', function(){
	 		_this.loadNews()
	 		})
	 	}


        NewsFormate.prototype.loadNews = function(){
        	var _this = this
        	$.get({
        		url: 'https://platform.sina.com.cn/slide/album_tech',
        		dataType: 'jsonp',
        		jsonp: "jsoncallback",
        		data: {
        			app_key: '1271687855',
        			num: this.perPageCount,
        			page: this.curPage
        		}
        	}).done(function(ret){
        		if(ret && ret.status && ret.status.code ==='0'){  /* ret.status.code ==='0'与后端约定状态为0发送成功*/
        			
        			_this.place(ret.data)	
        			console.log(ret.data)	//数据没问题，放置数据
        			_this.curPage++
        		}else{
        			console.log('get error data')
        		}
        	})
        }
       
        NewsFormate.prototype.place = function(nodeList){   //nodeList即ret.data
        	
        	var _this = this
        	
        	$(nodeList).each(function(index, item){      //item即遍历到的传入的数据ret.data.each,也可以写this,index即选择器位置
        		var $node = _this.getNode(item)	//将数据中信息拼接成html节点
        		$node.find('.thumb img').on('load', function(){  //图片加载完后
        			_this.$targets.append($node)               //放在items 子元素后面
        			_this.waterFall($node)
        		})
        			
        		
        	})
        }

  		//把数据转换成html中的节点
  		NewsFormate.prototype.getNode = function(item){
  			var htmls = ''
				htmls += '<div class="item">';
				htmls += '<a href="' + item.url + '">';   //新闻页面
				htmls += '<div class="thumb">';
				htmls += '<img src="' + item.img_url + '">';
				htmls += '</div><h4>' + item.short_name + '</h4>'
				htmls += '<p>' + item.short_intro + '</p>'
				htmls += '</a></div>'
			return $(htmls)
  		}

  		//对每次获得数据单独进行瀑布流
  		NewsFormate.prototype.waterFall = function($node){    //$node即组装好的htmls,集合
  			var _this = this
			$node.each(function(){     
			 	$cur = $(this)
			 	var idx =0,
					minSumHeight = _this.sumHeightArr[0];          //初始最短高度为0

				for(var i=0; i<_this.sumHeightArr.length; i++){    //遍历一列中的每一个
				 	if(_this.sumHeightArr[i] < minSumHeight){      //比较得到最小值
				 		minSumHeight = _this.sumHeightArr[i]
				 		idx = i
				 	}
				} 
				$cur.css({
				 	left: nodeWidth*idx,                //之前已经定位absolute,根据最小值得索引值得到left值
				 	top: minSumHeight,
				 	opacity: 1
				})
				_this.sumHeightArr[idx] += $cur.outerHeight(true)
				//因为子元素绝对定位脱离了文档流,父容器高度坍塌,需要设置高度,保证可见性
				_this.$targets.height(Math.max.apply(null, _this.sumHeightArr))     //借助了Math.max的方法使用apply,因为没有this所以是null
			})
		
  		}


	return NewsFormate

})

