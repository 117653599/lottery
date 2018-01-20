'use strict'

const path = require('path')
const config = require('../build/config')
const settings = config.settings
const baseRoot = config.baseRoot
const joinBaseRoot = file => path.join(baseRoot, 'datas', file)
const { getInfo } = require('./tools') 

module.exports = (req, res) => {
  console.log(req.query.type)
  const type = JSON.parse(req.query.type)
  switch (type) {
    case 0: {
      getInfo(joinBaseRoot('list_0.txt')).then(data => {
        const num = Math.floor((10 - data.length) / 5)
        const list_0 = {
          name: '特等奖',
          type: 0,
          totalNum: 5,
          totalTimes: num
        }
        res.render('lottery', list_0)
      })
      return
    }
    case 1: {
      getInfo(joinBaseRoot('list_1.txt')).then(data => {
        const num = Math.floor((15 - data.length) / 5)
        const list_1 = {
          name: '一等奖',
          type: 1,
          totalNum: 5,
          totalTimes: num
        }
        res.render('lottery', list_1)
      })
      return
    }
    case 2: {
      getInfo(joinBaseRoot('list_2.txt')).then(data => {
        const num = Math.floor((40 - data.length) / 10)
        const list_2 = {
          name: '二等奖',
          type: 2,
          totalNum: 10,
          totalTimes: num
        }
        res.render('lottery', list_2)
      })
      return
    }
    case 3: {
      getInfo(joinBaseRoot('list_3.txt')).then(data => {
        const num = Math.floor((80 - data.length) / 20)
        const list_3 = {
          name: '三等奖',
          type: 3,
          totalNum: 20,
          totalTimes: num
        }
        res.render('lottery', list_3)
      })
      return
    }
    case 4: {
      getInfo(joinBaseRoot('list_4.txt')).then(data => {
        const num = Math.floor((150 - data.length) / 25)
        const list_4 = {
          name: '四等奖',
          type: 4,
          totalNum: 25,
          totalTimes: num
        }
        res.render('lottery', list_4)
      })
      return
    }
    case 5: {
      getInfo(joinBaseRoot('list_5.txt')).then(data => {
        const num = Math.floor((300 - data.length) / 25)
        const list_5 = {
          name: '五等奖',
          type: 5,
          totalNum: 25,
          totalTimes: num
        }
        res.render('lottery', list_5)
      })
      return
    }
    case 6: {
      getInfo(joinBaseRoot('list_6.txt')).then(data => {
        const num = Math.floor((500 - data.length) / 25)
        const list_6 = {
          name: '六等奖',
          type: 6,
          totalNum: 25,
          totalTimes: num
        }
        res.render('lottery', list_6)
      })
      return
    }
  }
}
