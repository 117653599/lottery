'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../build/config')
const { getList } = require('./tools')

// 将中奖名单写入文件
module.exports = (req, res) => {
  const listPath = config.listDir
  getList(listPath).then(result => {
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
          res.send({code: 0, text:'写入成功'})
        } else {
          res.send({code: 1, text:'存储不成功'})
        }
      })
    } else {
      res.send({code: 1, text:'重复数据'})
    }
  }).catch(err => {
    res.send({code: 2, text:'存入不成功'})
  })
}
