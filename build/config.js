'use strict';

const path = require('path');
const publicPath = '/assets/';
const baseRoot = path.join(__dirname, '..')
const resolveUrl = file => path.resolve(process.cwd() + file)

exports.publicPath = publicPath;
exports.baseRoot = baseRoot;
exports.baseUrl = {
  xlsx: resolveUrl('/datas/all.xlsx'),
  data: resolveUrl('/datas/all.json'),
  list: resolveUrl('/datas/list.json')
}