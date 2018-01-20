require('../css/app.css')
const $ = require('jquery')

module.exports = function () {
  // 查看中奖名单
  $('#list').on('click', () => {
    window.open('/detail')
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
  // 测试添加删除功能的假数据
  const n = {
    data: JSON.stringify(['015347', 'hqlin15439', 'wmd15339', 3])
  }
  $('#add').on('click', () => {
    $.post('/add', n, result => {
      if (result) {
        console.log(result)
      } else {
        console.log(result)
      }
    })
  })
  // console.log(testData)
  $('#delete').on('click', () => {
    $.post('/delete', n, result => {
      if (result) {
        console.log(result)
      } else {
        console.log(result)
      }
    })
  })
  const checkadd = () => {
    return new Promise((resolve, reject) => {
      const data = require('../../datas/all.json')
      if (data.length) {
        resolve('all.json数据正常')
      } else {
        reject = '请先导入数据'
      }
    })
  }
  // $('#add-one').on('click', () => {
  //   checkadd().then(res => {
  //     console.log(res)
  //     const data = require('../../datas/test.json')
  //     if (data.length < 2) {
  //       window.open('/lottery')
  //     } else {
  //       console.log('该部分奖项已经抽完')
  //       $('#add-one').off('click').css({
  //         color: 'grey'
  //       })
  //     }
  //   }).catch(err => {
  //     alert(err)
  //   })
  // })
  $('#add-one').on('click', () => {
    window.open('/lottery?type=0')
  })
  $('#add-two').on('click', () => {
    checkadd().then(res => {
      console.log(res + ':打开二等奖抽奖')
    }).catch(err => {
      alert(err)
    })
  })
}
