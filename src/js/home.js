require('../css/app.css')
const $ = require('jquery')

module.exports = function () {
  // 测试添加删除功能的假数据
  const n = {
    data: JSON.stringify(['015347', 'hqlin15439', 'wmd15339', 3])
  }
  // 查看中奖名单
  $('#list').on('click', () => {
    window.open('/detail')
  })
  // 打开开始页面
  $('#start').on('click', () => {
    window.open('/start')
  })
  // 导入数据
  $('#load').on('click', () => {
    $.get('/load?' + Math.random() * 1000, result => {
      if (result) {
        console.log(result)
        alert('导入成功')
      } else {
        console.log(result)
        alert('导入失败，请检查excel文件格式')
      }
    })
  })
  // 测试添加数据
  $('#add').on('click', () => {
    $.post('/add', n, result => {
      if (result) {
        console.log(result)
      } else {
        console.log(result)
      }
    })
  })
  // 测试删除数据
  $('#delete').on('click', () => {
    $.post('/delete', n, result => {
      if (result) {
        console.log(result)
      } else {
        console.log(result)
      }
    })
  })
  // 不同按钮进入不同的抽奖界面
  $('#btns button').each((index, e) => {
    const _this = $(e)
    const url = '/lottery?type=' + index
    $(_this).on('click', () => {
      window.open(url)
    })
  })
}
