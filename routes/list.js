'use strict'

const data = require('../datas/list.json')
const list = {
  name: '获奖名单',
  data: data
};

module.exports = (req, res) => {
  res.send(list)
}
