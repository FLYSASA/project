define(['jquery'], function($){

	function Carousel(carousel){
 		this.carousel = carousel
 		this.init()
 		this.bind()
 	}

 	Carousel.prototype.init = function(){
 		var $imgCt = this.$imgCt = this.carousel.find('.img-ct'),//注意这里后面即使加入新的dom元素,由于dom缓存机制,$imgs里还是五个li,如果重新查$('.carousel .img-ct > li')就会有6个li
 			$bullet = this.$bullet = this.carousel.find('.bullet'),
 			$btnNext = this.$btnNext = this.carousel.find('.btn-next'),
 			$btnPre =this.$btnPre = this.carousel.find('.btn-pre')

 			
 		this.$firstImg = $imgCt.children('li').first(),
 		this.$lastImg = $imgCt.children('li').last()

 		this.currentIndex = 0,	//队列变化的标记
 		this.isAnimate = false	//状态锁防止用户重复点击
 		this.$imgLength = $imgCt.children().length,   //原始队列的长度

 		$imgCt.find('img').each(function(index, item){
 			$(item).width($(window).width())           //将图片大小设置成浏览器窗口大小
 			$(item).height($(window).height())
 		})
 		
 		this.$imgWidth = $imgCt.find('img').first().width()
 		this.$imgHeight = $imgCt.find('img').first().height()//图片宽高
		this.carousel.children('.carousel-container').width(this.$imgWidth)  //图片父容器高宽设置
		this.carousel.children('.carousel-container').height(this.$imgHeight)
		

			//添加伪装的元素到队列中去
 		$imgCt.prepend(this.$lastImg.clone())   //拷贝最后一张放在最前面
 		$imgCt.append(this.$firstImg.clone())   //拷贝第一张放在最后面

 			//扩充父容器的宽度，使其包含伪装元素，并将位置前移到第一张原始图片的位置
 		$imgCt.width(this.$firstImg.width()*$imgCt.children().length)
 		$imgCt.css('left', -this.$imgWidth)
 	}
 		
 	Carousel.prototype.bind = function(){
 		var _this = this,
 			clock
 			
 		function setInter(){
 			clock = setInterval(function(){   //2.5s自动播放
 				_this.playNext()
 			}, 2500)
 		}
 		 
 		setInter()
 		
 		$(window).on('resize', function(){
 			_this.$imgCt.find('img').each(function(index, item){
	 			$(item).width($(window).width())
	 			$(item).height($(window).height())
 			})
 			_this.$imgWidth = _this.$imgCt.find('img').first().width()
	 		_this.$imgHeight = _this.$imgCt.find('img').first().height()//图片宽度
			_this.carousel.children('.carousel-container').width(_this.$imgWidth)
			_this.carousel.children('.carousel-container').height(_this.$imgHeight)
			_this.$imgCt.width(_this.$firstImg.width()*_this.$imgCt.children().length)
			_this.$imgCt.animate({
				left: -_this.$imgWidth*(_this.currentIndex +1)
			},0)
			_this.setBullet()
 		})
 		
 		this.carousel.on('mouseover', function(){
 			clearInterval(clock)
 		})
 		this.carousel.on('mouseout', setInter)
	
 		this.$btnPre.on('click', function(e){
 			e.preventDefault()                 //阻止默认点击事件
 			_this.playPre()
 		})
 			
 		this.$btnNext.on('click', function(e){
 			e.preventDefault()
 			_this.playNext()
 		})

 		this.$bullet.on('click','li',function(e){
			 _this.currentIndex = $(this).index()
			 _this.$imgCt.animate({
				 left: -_this.$imgWidth*(_this.currentIndex +1)
			 })
			 _this.setBullet()
 		})

 	}

 	
 	

 		//向后
 	Carousel.prototype.playNext = function(){

 		var _this = this

 		if(this.isAnimate) return;
 		this.isAnimate = true    //一般在animate函数之前设置为true

 		this.$imgCt.animate({
 			left: '-='+this.$imgWidth
 		},'slow', function(){
 			_this.currentIndex++;

 			if(_this.currentIndex === _this.$imgLength){   //当当前图片序号等于图片总数时
 				_this.$imgCt.css('left', -_this.$imgWidth)   //重设为0,返回第一张
 				_this.currentIndex = 0
 			}

 			_this.isAnimate = false		//动画完成之后解锁
 			_this.setBullet()		//动画完成之后使小黑点跟随
 		})
 	}
 	
 		//向前
 	Carousel.prototype.playPre = function(){

 		var _this = this

 		if(this.isAnimate) return;
 		this.isAnimate = true
 			
 		this.$imgCt.animate({
 			left: '+='+this.$imgWidth
 		},'slow', function(){
 			_this.currentIndex--;
 			
 			if(_this.currentIndex < 0){
 				_this.$imgCt.css('left', -(_this.$imgLength*_this.$firstImg.width()) )  //跳到最后一张
 				_this.currentIndex = _this.$imgLength-1    //序列号从0开始
 			}

 			_this.isAnimate = false	//动画完成之后解锁
 			_this.setBullet()		//动画完成之后使小黑点跟随
 		})
 	}

 		//图片下边缘动态框跟随图片动态变化
 	Carousel.prototype.setBullet = function(){
 		this.$bullet.children()
 			   .removeClass('active')
 			   .eq(this.currentIndex)
 			   .addClass('active')
 	}

 	return Carousel
})
