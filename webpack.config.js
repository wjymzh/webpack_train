const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js", //打包后的文件名称
    path: path.resolve(__dirname, "./build"), //打包后的目录
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            // 缓存，加快babel-loader编译速度
            cacheDirectory: true,
            // 一系列插件的集合，包括处理箭头函数等，配置后是否需要配置plugins? 后面再看
            // 2021/5/12 结论：不需要配置其他plugins
            // useBuiltIns corejs 解决es6新增api无法编译问题（只能编译语法，例如箭头函数）
            presets: [
              // ['@babel/preset-env', { targets: 'defaults' }]
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
            ],
            plugins: [
              // 编译箭头函数
              "@babel/plugin-transform-arrow-functions",
              // 编译装饰器
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              // 编译类，loose true时是赋值法定义属性，false时是使用Object.defineProperty定义属性，后者是默认
              ["@babel/plugin-proposal-class-properties", { loose: false }],
            ],
          },
        },
      {loader:'./loaders/test1-loader.js'}]
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ["style-loader", "css-loader", "postcss-loader","./loaders/test2-loader.js"], // 切记从右向左解析原则
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader","./loaders/test2-loader.js"], // 从右向左解析原则
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
        generator: {
          filename: "icons/[name]--[hash].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "imgs/[name]--[hash].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "media/[name]--[hash].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]--[hash].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    new VueLoaderPlugin(),
  ],
};
