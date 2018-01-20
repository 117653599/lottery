'use strict'

const path = require('path')
const config = require('../build/config')
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
          info: {
            totalNum: 5,
            totalTimes: num
          }
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
          info: {
            totalNum: 5,
            totalTimes: num
          }
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
          info: {
            totalNum: 10,
            totalTimes: num
          }
        }
        res.render('lottery', list_2)
      })
      return
    }
    case 3: {
      console.log(33333333333)
      getInfo(joinBaseRoot('list_3.txt')).then(data => {
        const num = Math.floor((80 - data.length) / 20)
        const list_3 = {
          name: '三等奖',
          info: {
            totalNum: 20,
            totalTimes: num
          }
        }
        res.render('lottery', list_3)
      })
      return
    }
    case 4: {
      console.log(444444444)
      getInfo(joinBaseRoot('list_4.txt')).then(data => {
        const num = Math.floor((150 - data.length) / 25)
        const list_4 = {
          name: '四等奖',
          info: {
            totalNum: 25,
            totalTimes: num
          }
        }
        res.render('lottery', list_4)
      })
      return
    }
    case 5: {
      console.log(5555555555)
      getInfo(joinBaseRoot('list_5.txt')).then(data => {
        const num = Math.floor((300 - data.length) / 25)
        const list_5 = {
          name: '五等奖',
          info: {
            totalNum: 25,
            totalTimes: num
          }
        }
        res.render('lottery', list_5)
      })
      return
    }
    case 6: {
      console.log(666666666)
      getInfo(joinBaseRoot('list_6.txt')).then(data => {
        const num = Math.floor((500 - data.length) / 25)
        const list_6 = {
          name: '六等奖',
          info: {
            totalNum: 25,
            totalTimes: num
          }
        }
        res.render('lottery', list_6)
      })
      return
    }
  }
}
