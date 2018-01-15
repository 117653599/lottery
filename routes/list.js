'use strict'

const data = require('../datas/all.json')
const list = {
  name: '获奖名单',
  data: data
};

module.exports = (req, res) => {
  res.send(list)
}
