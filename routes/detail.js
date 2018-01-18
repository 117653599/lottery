'use strict'
// const list = {
//   name: 'hhhhh'
// }
const data = require('../datas/list.json')
module.exports = (req, res) => {
  console.log(data)
  res.render('detail', {data: data})
}
