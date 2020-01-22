const util = require('./util');
const basic = require('./webpack.basic.config');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports = merge(basic, {
    mode: 'production', // development / production
    output: {
        filename: util.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: util.assetsPath('js/[id].[chunkhash].js'),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
                elementUI: {
                    name: "chunk-elementUI", // 单独将 elementUI 拆包
                    priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../../'
                    }
                },
                'css-loader',
                'less-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(), // 打包时自动清理原来的文件的插件
        // 提取 CSS
        new MiniCssExtractPlugin({
            filename: util.assetsPath('css/styles-[chunkhash].css'),
            chunkFilename: util.assetsPath('css/[id]-[chunkhash].css')
        }),
        // 压缩 CSS
        new OptimizeCssAssetsPlugin({}),
        // new BundleAnalyzerPlugin()
    ]
})
