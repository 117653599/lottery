'use strict';

const webpack = require('webpack');

const webpackConfig = require('./webpack.config');
const rewriteViews = require('./prod');

const compiler = webpack(webpackConfig);

// run webpack
compiler.run((err, stats) => {
  console.log(err ? err : '[webpack]: build done!');
  console.log(stats.toString());

  // Rewrite views to release mode
  rewriteViews(true);
});
