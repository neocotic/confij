(function() {
  var Adapter, Confij, EventEmitter, Format, Utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('events').EventEmitter;

  Adapter = require('./adapter');

  Format = require('./format');

  Utils = require('./utils');

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
      this.adapter.load(function(err, data) {
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
      return this;
    };

    Confij.prototype.loadSync = function() {
      try {
        this.data = this.adapter.loadSync();
      } catch (err) {
        this.emit('error', err);
        throw err;
      }
      this.emit('loaded', this.data);
      return this.data;
    };

    Confij.prototype.parse = function(str, callback) {
      var _this = this;
      this.format.parse(str, function(err, obj) {
        if (typeof callback === "function") {
          callback(err, obj);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('parsed', obj);
        }
      });
      return this;
    };

    Confij.prototype.parseSync = function(str) {
      var obj;
      try {
        obj = this.format.parseSync(str);
      } catch (err) {
        this.emit('error', err);
        throw err;
      }
      this.emit('parsed', obj);
      return obj;
    };

    Confij.prototype.save = function(data, callback) {
      var _this = this;
      if (Utils.isFunction(data) && !(callback != null)) {
        callback = data;
        data = null;
      }
      if (data != null) {
        this.data = data;
      }
      this.adapter.save(this.data, function(err, buffer) {
        if (typeof callback === "function") {
          callback(err, buffer);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('saved', buffer);
        }
      });
      return this;
    };

    Confij.prototype.saveSync = function(data) {
      var buffer;
      if (data != null) {
        this.data = data;
      }
      try {
        buffer = this.adapter.saveSync(this.data);
      } catch (err) {
        this.emit('error', err);
        throw err;
      }
      this.emit('saved', buffer);
      return buffer;
    };

    Confij.prototype.stringify = function(obj, callback) {
      var _this = this;
      this.format.stringify(obj, function(err, str) {
        if (typeof callback === "function") {
          callback(err, str);
        }
        if (err != null) {
          return _this.emit('error', err);
        } else {
          return _this.emit('stringified', str);
        }
      });
      return this;
    };

    Confij.prototype.stringifySync = function(obj) {
      var str;
      try {
        str = this.format.stringifySync(obj);
      } catch (err) {
        this.emit('error', err);
        throw err;
      }
      this.emit('stringified', str);
      return str;
    };

    Confij.prototype.use = function(impl) {
      if (impl == null) {
        return;
      }
      if (impl instanceof Adapter) {
        this.adapter = impl;
        this.emit('adapterLoaded', impl);
      } else if (impl instanceof Format) {
        this.format = impl;
        this.emit('formatLoaded', impl);
      }
      return this;
    };

    return Confij;

  })(EventEmitter);

  module.exports = Confij;

}).call(this);
