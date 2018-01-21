'use strict'
// const list = {
//   name: 'hhhhh'
// }
// const data = require('../datas/list.json')
const data = [[12345, "11111", "9999999", 2]]
module.exports = (req, res) => {
  console.log(data)
  res.render('detail', {data: data})
}
