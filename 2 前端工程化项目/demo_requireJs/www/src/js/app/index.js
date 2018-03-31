//页面功能

//AMD,加载依赖
define(['jquery','com/goTop','com/carousel','com/newsFormate'],function($,Gotop,Carousel,Newsformate){
    //启动模块功能

    //启动到顶部模块
    new Gotop($('.ct'))
    //启动轮播模块
    new Carousel($('.carousel'))
    //启动加载更多模块
    new Newsformate( $('.news-container .news'), $('.news-container .btn')) 
})