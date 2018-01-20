require('../css/app.css')
const $ = require('jquery')
require('jquery.easing')

const Lottery = {
  _running: false,
  _intervalScroll: null,
  _intervalTimes: null,
  _currentUser: {},
  _Users: [],
  _totalNum: 1,
  _totalTimes: 1,
  start: function (duration) {
    this._running = true
    $('.btn').html('停止')
    const fn = () => {
      console.log('一直滚')
    }
    this._intervalScroll = setInterval(fn, duration)
    return this._intervalScroll
  },
  stopScroll: function () {
    this._running = false
    clearInterval(this._intervalScroll)
    $('.btn').html('开始')
  },
  stop: function (users) {
    $('.btn').html('中奖者产生中...')
    const fn = function () {
      console.log(users)
      Lottery.randomUser(users)
    }
    this._intervalTimes = setInterval(fn, 500)
    return this._intervalTimes
  },
  randomUser: function (users) {
    if (Lottery._Users.length === Lottery._totalNum) {
      return
    }
    const reIndex = Math.floor(Math.random() * users.length)
    // 取出的值正确保存到list里面，并且返回成功结果,那就把值存到当前的_Users里面
    const u = users[reIndex]
    this._currentUser = u
    this._Users.push(u)
    const user = {
      code: u[0],
      name: u[1],
      department: u[2]
    }
    Lottery.writeHtml(user)
  },
  writeHtml: function (user) {
    if ($('.result-parent').html().match('抽奖')) {
      $('.result-parent').html('')
    }
    const string = '<div class="result-children"><span>' + user.code + '(' + user.department + ')</span></div>'
    $('.result-parent').append(string)
  },
  restart: function () {
    console.log('清空')
    Lottery._Users = []
    if (Lottery._totalTimes > 0) {
      Lottery._totalTimes = Lottery._totalTimes - 1
    }
    if (Lottery._totalTimes === 0) {
      $('.btn').attr('disabled', 'true')
    }
    console.log(Lottery._totalTimes)
    $('.time').html(Lottery._totalTimes)
  }
}
module.exports = function () {
  // $(function () {
  // 页面初始化,通过接口获取参数
  Lottery._totalNum = 5
  Lottery._totalTimes = 2
  $('.time').html(Lottery._totalTimes)
  $.get('/list?v=' + Math.random() * 100000, result => {
    if (result) {
      console.log(result)
      $('.btn').click(function () {
        if (Lottery._running) {
          console.log(1)
          Lottery.stop(result.data)
          setTimeout(() => {
            clearInterval(Lottery._intervalTimes)
            Lottery.stopScroll()
            console.log('停了...')
            console.log(Lottery._Users)
            // 恢复初始化状态
            Lottery.restart()
          }, Lottery._totalNum * 500)
          return
        }
        $('.result-parent').html('抽奖进行中')
        Lottery.start(200)
      })
    } else {
      console.log('数据请求不成功')
    }
  })
}
