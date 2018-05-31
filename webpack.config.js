const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动化创建文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //devServer 生成的目录定时清除 不会有缓存.
const {VueLoaderPlugin} = require('vue-loader')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// 可以为函数,但要返回一个对象
module.exports = env => {
    if (!env) {
        env = {}
    }
    let plugins = [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './app/views/index.html',
            title: 'Development'
        }),
        new ExtractTextPlugin("style.css")  //抽取合并
    ]
    if (env.production) {
        plugins.push(
            //xiugai  全局变量
          new webpack.DefinePlugin({
              'process.env': {
                  NODE_ENV: "production"
              }
          }),
          // new ExtractTextPlugin("style.css")  //抽取合并
        )
    }
    return {
        entry: {
            app: './app/js/main.js' // 搜索这个文件进行编译打包
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"), //如需要静态文件 静态文件输入
            compress: true, //开启gzip 压缩
            port: 9000 //服务端口
        },
        module: {
            // 什么样的文件用啥样的解析器
            rules: [
                {
                test: /\.html$/,
                loader: 'html-loader'
            },{
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                // loader: 'vue-loader',
                // options: {
                //     cssModules: {
                //         localIdentName: '[path][name]---[local]---[hash:base64:5]',
                //         camelCase: true
                //     },
                //     loaders: {
                //         css:  env.production ? ExtractTextPlugin.extract({
                //             use: 'vue-style-loader!style-loader!css-loader!px2rem-loader?remUni=75&remPrecision=8!sass-loader',
                //             fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                //         }) : 'vue-style-loader!style-loader!css-loader!px2rem-loader?remUni=75&remPrecision=8',
                //        scss: 'vue-style-loader!style-loader!css-loader!px2rem-loader?remUni=75&remPrecision=8!sass-loader'
                //     }
                // }
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                cssModules: {
                                    localIdentName: '[path][name]---[local]---[hash:base64:5]',
                                    camelCase: true
                                },
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                scss: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'sass-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            },
                            // postcss: [autoprefixer]
                        }
                    },
                ]
            }, {
                test: /\.(scss|sass)$/,
                loader:
                //     ExtractTextPlugin.extract({
                //     use: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!px2rem-loader?remUni=75&remPrecision=8!sass-loader",
                //     fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                // })
                "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!px2rem-loader?remUni=75&remPrecision=8!sass-loader"
            }]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
            }
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: './app/views/index.html',
                title: 'Development'
            }),
            new ExtractTextPlugin("style.css")  //抽取合并
        ],
        output: {
            filename: '[name].min.js', //name和app对应的
            path: path.resolve(__dirname, 'dist') //相对路径 __dirname当前路径创建一个dist ,并输入
        }
    }
}
