'use strict'

const path = require('path')
const config = require('../build/config')
const { getList } = require('./tools')
const { hasTypeList } = require('./tools') 
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
const renderFun = (sourthPath, type) => {
  return new Promise((resolve, reject) => {
    getList(sourthPath).then(data => {
      const dataList = hasTypeList(data, type)
      const list_type = renderList(settings['t' + type], dataList.length)
      resolve(list_type)
    }).catch(err => {
      reject(err)
    })
  });
}

module.exports = (req, res) => {
  const sourthPath = joinBaseRoot('list.txt')
  console.log(req.query.type)
  const type = JSON.parse(req.query.type)
  switch (type) {
    case 0: {
      renderFun(sourthPath, 0).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
    case 1: {
      renderFun(sourthPath, 1).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
    case 2: {
      renderFun(sourthPath, 2).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
    case 3: {
      renderFun(sourthPath, 3).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
    case 4: {
      renderFun(sourthPath, 4).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
    case 5: {
      renderFun(sourthPath, 5).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
    case 6: {
      renderFun(sourthPath, 6).then(list_type => {
        res.render('lottery', list_type)
      })
      return
    }
  }
}
