'use strict'

const fs = require('fs')
const jsXLSX = require('xlsx')
const config = require('../build/config')
const downPath = config.downDir
const listPath = config.listDir

const { getList } = require('./tools')

module.exports = (req, res) => {
  fs.readFile(listPath, (err, data_data) => {
    if (!err) {
      console.log(JSON.parse(data_data))
      const data = JSON.parse(data_data)
      const _result = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const _item = {}
        _item.id = item[0]
        _item.name = item[1]
        _item.depart = item[2]
        _item.type = item[3]
        _result.push(_item)
      }
      const _headers = ['id', 'name', 'depart', 'type']
        const _data = _result
        const headers = _headers
          .map((v, i) => Object.assign({}, {
              v: v,
              position: String.fromCharCode(65 + i) + 1
          }))
          // 转换成 worksheet 需要的结构
          .reduce((prev, next) => Object.assign({}, prev, {
              [next.position]: {
                  v: next.v
              }
          }), {})
        const _data_ = _data
          // 匹配 headers 的位置，生成对应的单元格数据
          .map((v, i) => _headers.map((k, j) => Object.assign({}, {
              v: v[k],
              position: String.fromCharCode(65 + j) + (i + 2)
          })))
          // 对刚才的结果进行降维处理（二维数组变成一维数组）
          .reduce((prev, next) => prev.concat(next))
          // 转换成 worksheet 需要的结构
          .reduce((prev, next) => Object.assign({}, prev, {
              [next.position]: {
                  v: next.v
              }
          }), {})
        const output = Object.assign({}, headers, _data_)
        // 获取所有单元格的位置
        const outputPos = Object.keys(output)
        const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
        const wb = {
            SheetNames: ['mySheet'],
            Sheets: {
                'mySheet': Object.assign({}, output, {
                    '!ref': ref
                })
            }
        }
        jsXLSX.writeFile(wb, downPath, err => {
          if (!err) {
            res.send('下载成功')
          } else {
            res.send('下载失败')
          }
        })
    }
  })
}
