require('../lib/liMarquee.css')
require('../css/detail.css')
const $ = require('jquery')
require('../../src/lib/jquery.liMarquee')
require('../../src/lib/tableExport')
require('../../src/lib/jquery.base64')
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
  $('#table-export').on('click', function () {
    // _toast.show('11111')
    console.log(11111111)
    $('#table-id').tableExport({
      type: 'excel',
      escape: 'false'
    })
  })
}
