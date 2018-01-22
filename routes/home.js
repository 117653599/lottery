/*
 * home路由显示逻辑
 */
'use strict'

const config = require('../build/config')
const { getList } = require('./tools')
const { hasTypeList } = require('./tools') 
const { renderList } = require('./tools')
const settings = config.settings
const sourthPath = config.listDir

module.exports = (req, res) => {
  const list = []
  getList(sourthPath).then(data => {
    for (let i = 0; i < 7; i++) {
      const datalist = hasTypeList(data, i)
      const list_type = renderList(settings['t' + i], datalist.length)
      const item = {}
      item.name = list_type.name
      if (list_type.totalTimes > 0) {
        item.style = ''
      } else {
        item.style = 'disabled="disabled"'
      }
      item.totalTimes = list_type.totalTimes
      item.id = 'id = "add_' + i + '"'
      list[i] = item
    }
    // console.log(list)
    res.render('home', {list: list})
  })
  
}
