'use strict'

const path = require('path')
const publicPath = '/assets/'
const baseRoot = path.join(__dirname, '..')
const joinBaseRoot = file => path.join(baseRoot, file)

exports.publicPath = publicPath
exports.baseRoot = baseRoot
exports.xlsxDir = joinBaseRoot('datas/all.xlsx')
exports.allDir = joinBaseRoot('datas/all.json')
exports.listDir = joinBaseRoot('datas/list.txt')
exports.settings = {
  t0: {
    type: 0,
    name: '特等奖',
    len: 10,
    totalNum: 5
  },
  t1: {
    type: 1,
    name: '一等奖',
    len: 15,
    totalNum: 5
  },
  t2: {
    type: 2,
    name: '二等奖',
    len: 40,
    totalNum: 10
  },
  t3: {
    type: 3,
    name: '三等奖',
    len: 80,
    totalNum: 20
  },
  t4: {
    type: 4,
    name: '四等奖',
    len: 150,
    totalNum: 25
  },
  t5: {
    type: 5,
    name: '五等奖',
    len: 300,
    totalNum: 25
  },
  t6: {
    type: 6,
    name: '六等奖',
    len: 500,
    totalNum: 25
  }
}
