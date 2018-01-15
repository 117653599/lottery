'use strict'

const home = require('./home')
const list = require('./list')

exports.init = app => {

  app.get('/', home)
  app.get('/list', list)
  return app
}
