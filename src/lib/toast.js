(function utilFactory(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory.call(global);
  }
}(this, function utilExports() {
  var $ = require('jquery');
  var Overlay = require('./overlay');
  var empty = function() {};

  function Toast(settings) {
    var defaults = {
      zIndex: 2000,
      text: ' ',
      duration: 2000,
      callback: empty,
      autoClose: true,
      autoRemove: false,
      overlay: '',
      mask: false
    };

    var options = $.extend(defaults, settings);
    if (options.mask) {
      options.zIndex = 10000;
    }
    var view = $('<div class="ui-toast hidden">' + options.text + '</div>');
    view.appendTo('body');

    this.options = options;

    if (this.options.mask) {
      this.overlay = new Overlay(options.zIndex - 1, false);
    }
    this.view = view;
  }

  Toast.prototype.show = function(text) {
    this.view.html(text);
    this.view.removeClass('hidden');
    if (this.options.mask) {
      this.overlay.show();
    }
    this.timeout();
    return this;
  };

  Toast.prototype.hide = function() {
    this.view.addClass('hidden');
    if (this.options.mask) {
      this.overlay.hide();
    }
    if (this.options.callback) {
      this.options.callback.call(this);
    }
    return this;
  };

  Toast.prototype.timeout = function() {
    var that = this;

    if (!that.options.autoClose) {
      return that;
    }
    setTimeout(function() {
      if (that.options.autoRemove) {
        that.destroy();
      } else {
        that.hide();
      }
    }, that.options.duration);

    return this;
  };

  Toast.prototype.destroy = function() {
    this.view.remove();
    if (this.options.mask) {
      this.overlay.destroy();
    }
    return this;
  };

  Toast.create = function(arg) {
    return new Toast(arg);
  };

  this.Toast = Toast;

  return Toast;
}));
