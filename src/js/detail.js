require('../lib/liMarquee.css')
require('../css/detail.css')
const $ = require('jquery')
require('../../src/lib/jquery.liMarquee')
module.exports = function () {
  $(function () {
    $('.dowebok').liMarquee({
      direction: 'up'
    })
  })
  $('#app').on('click', function () {
    // _toast.show('11111')
    console.log(1)
  })
}
