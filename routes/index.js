'use strict'

const home = require('./home')

exports.init = app => {

  app.get('/', home)
  return app
}
