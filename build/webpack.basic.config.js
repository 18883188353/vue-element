const util = require('./util');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: util.resolve('src/main.js'),
    output: {
        filename: util.assetsPath('js/[name]-[hash].js'), // 入口文件
        chunkFilename: util.assetsPath('js/[id]-[chunkhash].js'),
        path: util.resolve('cusystem')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': util.resolve('src')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }
            , {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [util.resolve('src'), util.resolve('node_modules/element-ui/src'), util.resolve('node_modules/element-ui/packages')]
        }
            , {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, // 当文件大小小于8192字节时会把图片转换为base64编码的dataurl，否则返回普通的图片
                    name: '[name].[ext]',
                    outputPath: 'static/images'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, // 当文件大小小于8192字节时会把字体转换为base64编码的dataurl，否则返回普通的文件
                    name: '[name].[ext]',
                    outputPath: 'static/fonts'
                }
            }]
        }]
    },
    plugins: [
        new VueLoaderPlugin(), // .vue 模板文件处理插件
        new HTMLWebpackPlugin({
            filename: util.resolve('cusystem/index.html'),
            template: util.resolve('index.html'),
            inject: 'body', // 指定插入的<script>标签在body底部
            favicon: util.resolve('static/favicon.ico'),
            minify: { // 压缩HTML
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 不要留下任何空格
                keepClosingSlash: true, // 保留单例元素的末尾斜杠
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true, // 缩小CSS样式元素和样式属性
                minifyURLs: true // 在各种属性中缩小url
            }
        }),
        // 复制静态文件
        new CopyWebpackPlugin([
            {
                from: util.resolve('static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        // 设置全局变量
        new webpack.DefinePlugin({
            //_Model: JSON.stringify(JSON.parse(`"${process.env._Model}"`))
            _Model: JSON.stringify(process.env._Model)
        })
    ]
}