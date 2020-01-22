const util = require('./util');
const basic = require('./webpack.basic.config');
const merge = require('webpack-merge');

module.exports = merge(basic, {
    mode: 'development', // development / production
    devtool: 'eval-source-map',
    devServer: {
        // 项目路径 路径相对于当前文件所在目录
        contentBase: util.resolve('cusystem'),
        host: '0.0.0.0',
        port: 8009,
        open: false, //自动打开浏览器
        // 在 dev-server 的两种不同模式 inline 模式 / iframe 模式，是否切换到 iframe 模式
        //inline: false,
        /**
         * 是否启用模块的热替换功能，需要引入 webpack.HotModuleReplacementPlugin() 插件
         * 官网不推荐此种方式，推荐在启动命令中加入 --hot 无需引用 webpack.HotModuleReplacementPlugin() 插件
         */
        //hot: true, 
        // 启用时 除了初始启动信息将被写入到终端控制台外，其他不写入控制台。这也意味着来自webpack的错误或警告是不可见的。
        quiet: false,
        /**
         * 使用内联模式时，DevTools中的控制台将向您显示消息，例如在重新加载之前，错误之前或启用热模块替换时。
         * 客户端显示的日志级别  'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error'
         * */
        clientLogLevel: 'warn'
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'less-loader'
            ]
        }]
    }
})