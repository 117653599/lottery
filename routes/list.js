'use strict'

const list = {
  name: 'hi,list'
};

module.exports = (req, res) => {
  res.render('list', list)
}
