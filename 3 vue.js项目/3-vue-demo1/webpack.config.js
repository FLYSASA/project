const path = require('path')
module.exports = {
    mode: "development",
    entry: './app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
           'vue$': 'vue/dist/vue.common.js' //commonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。这些打包工具的默认文件 (pkg.main) 是只包含运行时的 CommonJS 版本 (vue.runtime.common.js)。
        }
    }
}