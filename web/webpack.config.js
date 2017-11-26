var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "eval",
  entry: [
    "whatwg-fetch",
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://0.0.0.0:9000",
    "webpack/hot/only-dev-server",
    "./main.jsx"
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "build/template.html"
    })
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: 9000,
    hot: true,
    host: "0.0.0.0",
    contentBase: "./build",
    disableHostCheck: true // 'Invalid host header'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: "babel",
      query: {
        "presets": ["es2015", "stage-0", "react"],
        "plugins": ["react-hot-loader/babel"]
      },
      include : __dirname,
      exclude: [
        path.join(__dirname, "style"),
        path.join(__dirname, "node_modules"),
        path.join(__dirname, "build"),
      ]
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, "style"),
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)/,
      loader: 'file-loader'
    }, {
      include: /\.json$/,
      loaders: ["json-loader"]
    }]
  }
};
