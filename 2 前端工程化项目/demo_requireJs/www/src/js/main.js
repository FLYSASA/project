requirejs.config({
    baseUrl: './src/js',      //main是index.html的位置出发的,main和build的baseUrl都指向js文件目录
    paths: {
        'jquery': 'lib/bower_components/jquery-3.2.0.min'
    }
})
requirejs(['app/index'])