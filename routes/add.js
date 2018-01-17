'use strict'

const fs = require('fs')

module.exports = (req, res) => {
  const data = require('../datas/list.json')
  const n = data.length
  let flag = 0
  const m = JSON.parse(req.body.data)
  console.log(m)
  for (let i = 0; i < n; i++) {
    if (data[i][0] === m[0]) {
      flag = 1
    }
  }
  if (flag !== 1) {
    data.push(m)
    fs.writeFile(__dirname + '/../datas/list.json', JSON.stringify(data), 'utf-8', (err) => {
      if (!err) {
        res.send('读取成功')
      } else {
        res.send('重复数据不存储')
      }
    })
  } else {
    res.send('重复数据')
  }
}
