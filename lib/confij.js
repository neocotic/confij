(function() {
  var Adapter, Confij, EventEmitter, Format,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('events').EventEmitter;

  Adapter = require('./adapter');

  Format = require('./format');

  Confij = (function(_super) {

    __extends(Confij, _super);

    function Confij(options) {
      var isReady;
      this.options = options != null ? options : {};
      isReady = function() {
        if (this.adapter && this.format) {
          return this.emit('ready');
        }
      };
      this.once('adapterLoaded', isReady);
      this.once('formatLoaded', isReady);
    }

    Confij.prototype.load = function(callback) {
      var _this = this;
      return this.adapter.load(function(err, data) {
        _this.data = data;
        if (typeof callback === "function") {
          callback(err, _this.data);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('loaded', _this.data);
        }
      });
    };

    Confij.prototype.parse = function(str, callback) {
      var _this = this;
      return this.format.parse(str, function(err, obj) {
        if (typeof callback === "function") {
          callback(err, obj);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('parsed', obj);
        }
      });
    };

    Confij.prototype.save = function(data, callback) {
      var _this = this;
      if ('function' === typeof data && !(callback != null)) {
        callback = data;
        data = null;
      }
      return this.adapter.save(data != null ? data : this.data, function(err, buffer) {
        if (typeof callback === "function") {
          callback(err, buffer);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('saved', buffer);
        }
      });
    };

    Confij.prototype.stringify = function(obj, callback) {
      var _this = this;
      return this.format.stringify(obj, function(err, str) {
        if (typeof callback === "function") {
          callback(err, str);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('stringified', str);
        }
      });
    };

    Confij.prototype.use = function(impl) {
      if (impl == null) {
        return;
      }
      if (impl instanceof Adapter) {
        this.adapter = impl;
        return this.emit('adapterLoaded', impl);
      } else if (impl instanceof Format) {
        this.format = impl;
        return this.emit('formatLoaded', impl);
      }
    };

    return Confij;

  })(EventEmitter);

  module.exports = Confij;

}).call(this);
