'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../build/config')
const { getInfo } = require('./tools')
const joinBaseRoot = type => path.join(config.baseRoot, 'datas', 'list_' + type + '.txt')
// console.log('xxxx:', joinBaseRoot(0))

// 将中奖名单写入文件
module.exports = (req, res) => {
  const type = JSON.parse(req.body.type)
  const path1 = type => {
    switch (type) {
      case '0': {
        return joinBaseRoot(0)
      }
      case '1': {
        return joinBaseRoot(1)
      }
      case '2': {
        return joinBaseRoot(2)
      }
      case '3': {
        return joinBaseRoot(3)
      }
      case '4': {
        return joinBaseRoot(4)
      }
      case '5': {
        return joinBaseRoot(5)
      }
      case '6': {
        return joinBaseRoot(6)
      }
      default : {
        return joinBaseRoot('all')
      }
    }
  }
  const listPath = path1(req.body.type)
  console.log(listPath)
  getInfo(listPath).then(result => {
    const data = result
    const reqData = JSON.parse(req.body.data)
    let flag = 0
    // 去重
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === reqData[0]) {
        flag = 1
      }
    }
    if (flag !== 1) {
      data.push(reqData)
      fs.writeFile(listPath, JSON.stringify(data), 'utf-8', (err) => {
        if (!err) {
          res.send('写入成功')
        } else {
          res.send('存储不成功')
        }
      })
    } else {
      res.send('重复数据')
    }
  }).catch(err => {
    res.send(err)
  })
}
