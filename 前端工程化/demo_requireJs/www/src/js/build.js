({
    baseUrl: '.',             //根据build.js文件位置找基准url .代表build所处js目录
    paths: {
        'jquery': 'lib/bower_components/jquery-3.2.0.min'  //不要加尾缀.js
    },
    name: 'main',       //从哪个文件开始解析
    out: '../../dist/js/index.merge.min.js'   //输出到哪个文件  ../到src文件夹再../到www文件夹再到下面的dist文件夹
})