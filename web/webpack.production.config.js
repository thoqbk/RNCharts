var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: false,
  entry: {
    app: "./main.jsx"
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "build/template.html"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: "babel",
      query: {
        "presets": ["es2015", "stage-0", "react"],
        "plugins": ["react-hot-loader/babel"]
      },
      exclude: [
        path.join(__dirname, "style"),
        path.join(__dirname, "node_modules"),
        path.join(__dirname, "build"),
        path.join(__dirname, "ui/components/recharts/generateCategoricalChart.js"),
      ]
    }, {
      test: /\.css$/, // Only .css files
      loader: ExtractTextPlugin.extract(
        "style-loader",
        "css-loader?sourceMap"
      )
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, 'style'),
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)/, loader: 'file-loader'
    }]
  }
};
