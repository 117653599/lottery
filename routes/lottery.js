'use strict'

const path = require('path')
const config = require('../build/config')
const { getInfo } = require('./tools') 
const settings = config.settings
const baseRoot = config.baseRoot
const joinBaseRoot = file => path.join(baseRoot, 'datas', file)
// 计算奖项当前剩余情况
const renderList = (typelist, len) => {
  const list = {}
  list.name = typelist.name
  list.type = typelist.type
  list.len = typelist.len
  list.totalNum = typelist.totalNum
  list.totalTimes = Math.floor((typelist.len - len) / typelist.totalNum)
  return list
}

module.exports = (req, res) => {
  console.log(req.query.type)
  const type = JSON.parse(req.query.type)
  switch (type) {
    case 0: {
      getInfo(joinBaseRoot('list_0.txt')).then(data => {
        const list_0 = renderList(settings.t0, data.length)
        res.render('lottery', list_0)
      })
      return
    }
    case 1: {
      getInfo(joinBaseRoot('list_1.txt')).then(data => {
        const list_1 = renderList(settings.t1, data.length)
        res.render('lottery', list_1)
      })
      return
    }
    case 2: {
      getInfo(joinBaseRoot('list_2.txt')).then(data => {
        const list_2 = renderList(settings.t2, data.length)
        res.render('lottery', list_2)
      })
      return
    }
    case 3: {
      getInfo(joinBaseRoot('list_3.txt')).then(data => {
        const list_3 = renderList(settings.t3, data.length)
        res.render('lottery', list_3)
      })
      return
    }
    case 4: {
      getInfo(joinBaseRoot('list_4.txt')).then(data => {
        const num = Math.floor((150 - data.length) / 25)
        const list_4 = renderList(settings.t4, data.length)
        res.render('lottery', list_4)
      })
      return
    }
    case 5: {
      getInfo(joinBaseRoot('list_5.txt')).then(data => {
        const list_5 = renderList(settings.t5, data.length)
        res.render('lottery', list_5)
      })
      return
    }
    case 6: {
      getInfo(joinBaseRoot('list_6.txt')).then(data => {
        const list_6 = renderList(settings.t6, data.length)
        res.render('lottery', list_6)
      })
      return
    }
  }
}
