require('../css/app.css')
const $ = require('jquery')
require('jquery.easing')
const Users = require('../../datas/all.json')[0].data
// 四轮洗牌
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
const Lottery = {
  _picHeight: 120,
  _running: false,
  _intervalId: null,
  _intervalTimes: null,
  _currentUser: {},
  _numTime: 0,
  _Users: [],
  _numTotal: 1,
  start: function (duration) {
    this._running = true
    $('.btn').html('停止')
    let i = 0
    const fn = function () {
      $('.num').each(function (index) {
        const _num = $(this)
        index += i++
        _num.animate({
          backgroundPositionY: (Lottery._picHeight * 60) - (Lottery._picHeight * index)
        }, {
          duration: 200,
          easing: 'easeOutQuad'
        })
      })
    }
    this._intervalId = setInterval(fn, duration)
    return this._intervalId
  },
  // 结束
  stop: function () {
    this._running = false
    clearInterval(this._intervalId)
    $('.btn').html('开始')
  },
  isRunning: function () {
    return this._running
  },
  selectedUser: {},
  randomUser: function (users) {
    const rd = Math.floor(Math.random() * users.length)
    if (this.selectedUser['SI_' + rd] === true) {
      return this.randomUser(users)
    }
    this.selectedUser['SI_' + rd] = true
    const u = users[rd]
    return {
      index: rd,
      code: u[0],
      name: u[1],
      // nameEn: u[2],
      // sex: u[3],
      // city: u[4],
      department: u[2]
    }
  },
  stopToUser: function (user) {
    const numArr = (user.code).split('')
    const newNumArr = numArr
    const u = this._picHeight
    $('.num').each(function (index) {
      const _num = $(this)
      setTimeout(function () {
        _num.animate({
          backgroundPositionY: (u * 60) - (u * newNumArr[index])
        }, {
          duration: 100 + index * 800,
          easing: 'easeInOutCirc'
        })
      }, 200)
    })
    setTimeout(function () {
      const string = '<div class="result-children"><span>' + user.name + '(' + user.department + ')</span></div>'
      $('.result-parent').append(string)
    }, 4300)
  },
  addUsers: function () {
    for (let i = 0; i < this._numTotal; i++) {
      const user = this.randomUser(Users)
      this._Users.push(user)
      this._currentUser = user
    }
  },
  writeHtml: function (user) {
    if ($('.result-parent').html().match('开始抽奖')) {
      $('.result-parent').html('')
    }
    const string = '<div class="result-children"><span>' + user.code + '(' + user.department + ')</span></div>'
    $('.result-parent').append(string)
  }
}
module.exports = function () {
  console.log(window.innerHeight)
  $(function () {
    $('.lottery').css({
      height: window.innerHeight
    })
    // 从配置文件获取
    Lottery._numTotal = 25
    const everyInter = 500
    const totalTime = Lottery._numTotal * 500
    $('.btn').click(function () {
      if (Lottery.isRunning()) {
        $('.btn').html('中奖者产生中...')
        // 按钮打灰
        Lottery.addUsers()
        const fn = function () {
          if (Lottery._numTime > Lottery._numTotal - 2) {
            return
          }
          const numTime = Lottery._numTime
          const user = Lottery._Users[numTime]
          Lottery.writeHtml(user)
          console.log('fn-numTime:' + numTime + ':' + user.name)
          Lottery._numTime = Lottery._numTime + 1
        }
        Lottery._intervalTimes = setInterval(fn, everyInter)
        setTimeout(() => {
          clearInterval(Lottery._intervalTimes)
          Lottery.stop()
          Lottery.stopToUser(Lottery._currentUser)
        }, totalTime)
        return
      }
      Lottery.start(200)
    })
    $(document).keydown(function (ee) {
      const e = ee || window.event
      if (e.keyCode === 32) {
        if (Lottery.isRunning()) {
          $('.btn').html('中奖者产生中...')
          Lottery.addUsers()
          const fn = function () {
            if (Lottery._numTime > Lottery._numTotal - 2) {
              return
            }
            const numTime = Lottery._numTime
            const user = Lottery._Users[numTime]
            Lottery.writeHtml(user)
            console.log('fn-numTime:' + numTime + ':' + user.name)
            Lottery._numTime = Lottery._numTime + 1
          }
          Lottery._intervalTimes = setInterval(fn, everyInter)
          setTimeout(() => {
            clearInterval(Lottery._intervalTimes)
            Lottery.stop()
            Lottery.stopToUser(Lottery._currentUser)
          }, totalTime)
          return
        }
        Lottery.start(200)
      }
    })
    // btn事件
    // $('.btn').click(function() {
    //   if (Lottery.isRunning()) {
    //     Lottery.stop()
    //     var user = Lottery.randomUser(Users)
    //     Lottery.stopToUser(user)
    //     return
    //   }
    //   var i = 0
    //   Lottery.start(200)
    // })

    // $(document).keydown(function (ee) {
    //   const e = ee || window.event
    //   if (e.keyCode === 32) {
    //     if (Lottery.isRunning()) {
    //       Lottery.stop()
    //       const user = Lottery.randomUser(Users)
    //       Lottery.stopToUser(user)
    //       return
    //     }
    //     Lottery.start(200)
    //   }
    // })
  })
}
