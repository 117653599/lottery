'use strict'

const fs = require('fs')
const m = [22229,"hqlin22229","wmd22292"]

module.exports = (req, res) => {
  const data = require('../datas/list.json')
  const n = data.length
  data.push(m)
  fs.writeFile(__dirname + '/../datas/list.json', JSON.stringify(data), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    } else {
      const list = {
        name: '获奖名单',
        data: data
      }
      res.send(list)
    }
  }) 
}
