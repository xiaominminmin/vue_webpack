const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动化创建文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
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
      rules: [{
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
          test: /\.css$/,
          loader: "vue-style-loader!css-loader"
      }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development'
        })
    ],
    output: {
      filename: '[name].min.js', //name和app对应的
      path: path.resolve(__dirname, 'dist') //相对路径 __dirname当前路径创建一个dist ,并输入
    }
}
