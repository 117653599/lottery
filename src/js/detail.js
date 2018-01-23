require('../lib/liMarquee.css')
require('../css/detail.css')
const $ = require('jquery')
require('../../src/lib/jquery.liMarquee')
module.exports = function () {
  $(function () {
    const yHeight = window.innerHeight - 395
    console.log(window.innerHeight)
    $('.detail-bg').css({
      height: yHeight
    })
    $('.dowebok').liMarquee({
      direction: 'up'
    })
  })
  $('#app').on('click', function () {
    console.log(1)
  })
  $('#table-export').on('click', function () {
    $.get('./downloads?v=' + Math.random() * 1000, result => {
      console.log(result)
    })
  })
}
