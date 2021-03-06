const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const webpack = require('webpack')

const config = require('./config');
const baseRoot = config.baseRoot;
const publicPath = config.publicPath;

const joinBaseRoot = file => path.join(baseRoot, file);

const webpackConfig = {
  entry: {
    app: joinBaseRoot('src/js/app.js')
  },
  output: {
    publicPath: publicPath,
    path: joinBaseRoot('src/assets/'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader'},
            { 
              loader: 'postcss-loader',
              options: {
                plugins: [
                  stylelint(),
                  autoprefixer({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|svg|gif|jpg|jpe?g|icon?)$/,
        loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]',
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, joinBaseRoot('src/lib')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
  ]
};

module.exports = webpackConfig;
