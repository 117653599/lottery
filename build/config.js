'use strict'

const path = require('path')
const publicPath = '/assets/'
const baseRoot = path.join(__dirname, '..')
const joinBaseRoot = file => path.join(baseRoot, file)

exports.publicPath = publicPath
exports.baseRoot = baseRoot
exports.xlsxDir = joinBaseRoot('datas/all.xlsx')
exports.jsonDir = joinBaseRoot('datas/all.json')
