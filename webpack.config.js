const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack')


module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, './src' )
    },
    extensions: ['.js', '.json']
  },
  
  devtool: 'cheep-module-eval-source-map',
  devServer: {
    hot: true,
    open: false,
    host: '127.0.0.1',
    port: 8086,
    proxy: {
      '/api': {
        target: 'http://vv.video.qq.com/',
        pathRewrite: {'^/api': ''},
        changeOrigin: true,
      }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '腾讯视频解析',
      template: path.join(__dirname,'./src/index.html')
    }),
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
