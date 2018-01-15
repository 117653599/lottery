'use strict'

const list = {
  name: 'hi,林华清'
};

module.exports = (req, res) => {
  res.render('home', list)
}
