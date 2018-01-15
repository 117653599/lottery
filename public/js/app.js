require('../css/app.css')
console.log(1999999999999)
const $ = require('jquery')
$('#app').on('click', () => {
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

$('#add').on('click', () => {
  $.get('/add?' + Math.random() * 1000, result => {
    if (result) {
      console.log(result)
    } else {
      console.log(result)
    }
  })
})
// const add = n => {
//   $.get('/add?num=' + n + Math.random() * 1000, result => {
//     if (result) {
//       console.log(result)
//     } else {
//       console.log(result)
//     }
//   })
// }
