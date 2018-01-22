/*
 * 获取参加抽奖的用户信息列表
 */
'use strict'

const config = require('../build/config')
const { getList } = require('./tools')
const sourthPath = config.allDir

module.exports = (req, res) => {
  // 读取all.txt文件数据
  getList(sourthPath).then(data => {
    const Users = data
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
      name: '参与抽奖名单',
      data: Users
    }
    res.send(list)
  }).catch(err => {
    console.log('没有数据')
  })
}
