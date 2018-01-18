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
  if (err) {
    console.log(chalk.red(err))
  } else {
    console.log(chalk.green('[webpack]: build done!'));
  }
  console.log('\n', stats.toString());
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
