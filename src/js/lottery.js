require('../css/app.css')
const $ = require('jquery')
require('jquery.easing')

const Lottery = {
  _picHeight: 120,
  _type: -1,
  _running: false,
  _intervalScroll: null,
  _intervalTimes: null,
  _currentUser: {},
  _Users: [],
  _totalNum: 1,
  _totalTimes: 1,
  start: function (duration) {
    this._running = true
    $('#btn-click').html('停止抽奖')
    let i = 0
    const fn = () => {
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
    this._intervalScroll = setInterval(fn, duration)
    return this._intervalScroll
  },
  stopScroll: function () {
    this._running = false
    clearInterval(this._intervalScroll)
    $('#btn-click').html('开始抽奖')
  },
  stop: function (users) {
    $('#btn-click').html('中奖者产生中...')
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
    users[reIndex].push(JSON.parse(this._type))
    const n = {
      data: JSON.stringify(users[reIndex])
    }
    console.log('当前用户：', JSON.stringify(users[reIndex]))
    $.post('/add', n, result => {
      if (!result.code) {
        const u = users[reIndex]
        this._currentUser = u
        this._Users.push(u)
        const user = {
          code: u[0],
          name: u[1],
          department: u[2]
        }
        Lottery.writeHtml(user)
      } else {
        console.log(result.text)
      }
    })
  },
  writeHtml: function (user) {
    if ($('.result-parent').html().match('num_bg_box')) {
      $('.result-parent').html('')
    }
    const string = '<div class="result-children"><span>' + user.name + '(' + user.department + ')</span></div>'
    $('.result-parent').append(string)
  },
  restart: function () {
    console.log('清空')
    Lottery._Users = []
    if (Lottery._totalTimes > 0) {
      Lottery._totalTimes = Lottery._totalTimes - 1
    }
    if (Lottery._totalTimes === 0) {
      $('#btn-click').attr('disabled', 'true')
    }
    $('#total-times').html(Lottery._totalTimes)
  }
}
module.exports = function () {
  const yHeight = window.innerHeight - 395
  console.log(window.innerHeight)
  $('.lottery-bg').css({
    height: yHeight
  })
  // 页面初始化,通过接口获取参数
  Lottery._totalNum = $('#total-num').html()
  Lottery._totalTimes = $('#total-times').html()
  Lottery._type = $('#total-type').html()
  // 没有选择抽奖类型
  if (Lottery._type === -1) {
    alert('没有选择奖项类型')
    window.close()
    return
  }
  // 没有所有奖项已经抽完
  if (JSON.parse(Lottery._totalTimes) === 0) {
    alert('所有奖项已经抽完')
    return
  }
  $.get('/userslist?v=' + Math.random() * 100000, result => {
    console.log(result.data.length)
    if (result.data.length) {
      $('#btn-click').click(function () {
        if (Lottery._running) {
          Lottery.stop(result.data)
          setTimeout(() => {
            clearInterval(Lottery._intervalTimes)
            Lottery.stopScroll()
            // 恢复初始化状态
            Lottery.restart()
          }, Lottery._totalNum * 500)
          return
        }
        const strings = '<div class="num_bg_box"><div class="num_bg"></div><div class="num_bg"></div><div class="num_bg"></div><div class="num_bg"></div><div class="num_bg"></div><div class="num_bg"></div><div class="num_bg"></div></div><div class="num_box"><div class="num"></div><div class="num"></div><div class="num"></div><div class="num"></div><div class="num"></div><div class="num"></div><div class="num"></div></div>'
        $('.result-parent').html(strings)
        Lottery.start(200)
      })
    } else {
      alert('数据已经抽完')
      console.log('数据请求不成功')
    }
  })
}
