'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../build/config')
const allPath = path.join(config.baseRoot, 'datas/list.json')

module.exports = (req, res) => {
  const reqdata = JSON.parse(req.body.data)
  fs.readFile(allPath, (err, data) => {
    if (err || !data.length) {
      res.send('请先导入数据')
    } else {
      const listdata = require(allPath)
      for (let i = 0; i < listdata.length; i++) {
        if (listdata[i][0] === reqdata[0]) {
          listdata.splice(i, 1)
          fs.writeFile(allPath, JSON.stringify(listdata), 'utf-8', err => {
            if (!err) {
              console.log('xxx')
            } else {
              res.send(err)
            }
          })
        }
      }
      res.send(data)
    }
  })
}