require('../css/app.css')
const $ = require('jquery')

module.exports = function () {
  $('#list').on('click', () => {
    $.get('/list?' + Math.random() * 1000, result => {
      console.log(result)
    })
  })
  $('#load').on('click', () => {
    $.get('/load?' + Math.random() * 1000, result => {
      if (result) {
        console.log(result)
      } else {
        console.log(result)
      }
    })
  })

  // 数据存储有问题
  const n = {
    data: JSON.stringify([22235, 'hqlin22235', 'wmd22235'])
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
}
