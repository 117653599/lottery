'use strict'

const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')
const config = require('../build/config')
const xmlPath = config.xlsxDir
const allPath = config.allDir

const { getList } = require('./tools')
  
module.exports = (req, res) => {
  // 导入数据文件，all.xlsx文件格式固定
  // 没有做判断没有文件的情况
  const data = xlsx.parse(xmlPath)
  console.log(data)
  getList(allPath).then(result => {
    fs.writeFile(allPath, JSON.stringify(data[0].data), 'utf-8', err => {
      if (err) {
        res.send(false)
      } else {
        res.send(true)
      }
    })
  })
}
