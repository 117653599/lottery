'use strict'

const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')
const config = require('../build/config')
const xmlPath = config.xlsxDir
const jsonPath = config.jsonDir
  
module.exports = (req, res) => {
  const data = JSON.stringify(xlsx.parse(xmlPath))
  fs.writeFile(jsonPath, data, 'utf-8', err => {
    if (err) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
}
