require('../css/app.css')
const $ = require('jquery')

const modules = {
  home: require('./home'),
  lottery: require('./lottery'),
  detail: require('./detail')
}

const matchModule = pathname => {
  var parts = pathname.split('/')
  if (parts && parts[1]) {
    return parts[1]
  }
  return null
}
const ready = () => {
  var moduleId = matchModule(window.location.pathname)
  var module = modules[moduleId]
  if (!module) {
    module = modules.home
  }
  module()
}
$(document).ready(ready)
