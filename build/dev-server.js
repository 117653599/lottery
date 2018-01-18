'use strict';

const chalk = require('chalk')
const webpack = require('webpack');
const bs = require('browser-sync').create();

const webpackConfig = require('./webpack.config');
const rewriteViews = require('./prod');
const compiler = webpack(webpackConfig);

// to watch /asssets
compiler.watch({
  aggregateTimeout: 300
}, (err, stats) => {
  console.log(err ? err : '[webpack]: build done!');
  console.log(stats.toString());
});

// Rewrite views to development mode
rewriteViews(false);

// start browser-sync
bs.init({
  ui: {
    port: 9000
  },
  proxy: 'http://localhost:9000',
  files: ['src/assets/*.js', 'src/assets/*.css', 'views/*.html']
});
