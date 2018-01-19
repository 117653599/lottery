'use strict'

const home = require('./home')
const lottery = require('./lottery')
const detail = require('./detail')
const list = require('./list')
const load = require('./load')
const add = require('./add')

exports.init = app => {
  // 页面
  app.get('/', home)
  app.get('/lottery', lottery)
  app.get('/detail', detail)
  // API
  app.get('/list', list)
  app.get('/load', load)
  app.post('/add', add)
  return app
}
