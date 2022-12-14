const path = require("path");
const webpackConfig = require("./webpack.config.js");
const WebpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //压缩js

module.exports = WebpackMerge.merge(webpackConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src"),
          to: path.resolve(__dirname, "build"),
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        //压缩js
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // 只打包初始时依赖的第三方
        },
      },
    },
  },
});
