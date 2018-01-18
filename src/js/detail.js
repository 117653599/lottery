require('../css/toast.css')
const $ = require('jquery')
const Toast = require('../lib/toast')
const _toast = new Toast()
module.exports = function () {
  // console.log('detail')
  $('#app').on('click', function () {
    _toast.show('11111')
    console.log(1)
  })
}
