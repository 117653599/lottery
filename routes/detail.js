/*
 * 拼贴前端需要的数据
 */
'use strict'

const config = require('../build/config')
const sourcePath = config.listDir
const { getList, hasTypeList } = require('./tools')

module.exports = (req, res) => {
  getList(sourcePath).then(result => {
    const datalist = []
    for (let i = 0; i < 7; i++) {
      const item = {}
      if (i === 0) {
        item.name = '特等奖'
      } else {
        item.name = i + '等奖'
      }
      item.data = hasTypeList(result, i)
      datalist.push(item) 
    }
    res.render('detail', {data: datalist})
  })
  
}
