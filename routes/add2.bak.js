'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../build/config')
const listPath = path.join(config.baseRoot, 'datas/list.json')
// 初始化中奖文件,数据未空
const writeInFile = fpath => {
  const buff = new Buffer('[]')
  return new Promise((resolve, reject) => {
    fs.writeFile(fpath, buff, 'utf-8', err => {
      if (err) {
        reject(null)
      } else {
        resolve(fpath)
      }
    })
  })
}
// 判断文件是否存在
const readInFile = fpath => {
  return new Promise((resolve, reject) => {
    fs.readFile(fpath, (err, data) => {
      if (err || !data.length) {
        writeInFile(fpath).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(fpath)
      }
    })
  })
}
// 将中奖名单写入文件
module.exports = (req, res) => {
  readInFile(listPath).then(fpath => {
    console.log(fpath)
    const data = require(fpath)
    const len = data.length
    let flag = 0
    // 去重名
    const reqData = JSON.parse(req.body.data)
    for (let i = 0; i < len; i++) {
      if (data[i][0] === reqData[0]) {
        flag = 1
      }
    }
    if (flag !== 1) {
      data.push(reqData)
      fs.writeFile(fpath, JSON.stringify(data), 'utf-8', (err) => {
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
