'use strict'

const home = require('./home')
const lottery = require('./lottery')
const list = require('./list')
const load = require('./load')
const add = require('./add')

exports.init = app => {

  app.get('/', home)
  app.get('/lottery', lottery)
  app.get('/list', list)
  app.get('/load', load)
  app.post('/add', add)
  return app
}
