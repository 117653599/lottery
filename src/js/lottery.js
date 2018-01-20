require('../css/app.css')
const $ = require('jquery')
require('jquery.easing')

module.exports = function () {
  console.log(window.innerHeight + ':111')
  $.get('/list?' + Math.random() * 1000, result => {
    if (result) {
      console.log(result)
    } else {
      console.log(result)
    }
  })
}
