'use strict'

const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')
const xmlPath = path.resolve(process.cwd() + '/datas/all.xlsx')
const jsonPath = path.resolve(process.cwd() + '/datas/all.json')
  
module.exports = (req, res) => {
  const data = JSON.stringify(xlsx.parse(xmlPath))
  fs.writeFile(jsonPath, data, 'utf-8', err => {
    if (!err) {
      res.send(true)
    }
  })
}
