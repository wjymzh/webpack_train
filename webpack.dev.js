//开发环境
const path = require("path");
const webpackConfig = require("./webpack.config.js");
const WebpackMerge = require("webpack-merge");
const webpack = require("webpack");

// Webpack-merge 提供了一个函数，该函数将数组串联并合并创建新对象的对象。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值包装在函数中。

module.exports = WebpackMerge.merge(webpackConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true,
    open:true,
    static: {
      directory: path.join(__dirname, "build"),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
  ],
});
