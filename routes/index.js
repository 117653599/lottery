'use strict'

const home = require('./home')
const list = require('./list')
const load = require('./load')
const add = require('./add')

exports.init = app => {

  app.get('/', home)
  app.get('/list', list)
  app.get('/load', load)
  app.get('/add', add)
  return app
}
