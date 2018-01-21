'use strict'

const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')
const config = require('../build/config')
const xmlPath = config.xlsxDir
const allPath = config.allDir

const { getList } = require('./tools')
  
module.exports = (req, res) => {
  const data = (xlsx.parse(xmlPath))
  getList(allPath).then(result => {
    fs.writeFile(allPath, data, 'utf-8', err => {
      if (err) {
        res.send(false)
      } else {
        res.send(true)
      }
    })
  })
}
