'use strict'

module.exports = (req, res) => {
  const Users = require('../datas/all.json')[0].data
  // 4轮排序
  Users.sort(function (a, b) {
    return Math.random() > 0.5 ? -1 : 1
  })
  Users.sort(function (a, b) {
    return (a % 3) === 0
  })
  Users.sort(function (a, b) {
    return Math.random() > 0.4 ? -1 : 1
  })
  Users.sort(function (a, b) {
    return Math.random() > 0.6 ? -1 : 1
  })
  const list = {
    name: '获奖名单',
    data: Users
  }
  res.send(list)
}
