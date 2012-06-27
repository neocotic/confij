(function() {
  var Adapter, HTTPS_OPTIONS, HttpAdapter, Url,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Url = require('url');

  Adapter = require('../adapter');

  HTTPS_OPTIONS = ['ca', 'cert', 'key', 'passphrase', 'pfx'];

  HttpAdapter = (function(_super) {

    __extends(HttpAdapter, _super);

    function HttpAdapter(confij, target) {
      var createAgent, key, value, _ref;
      HttpAdapter.__super__.constructor.call(this, confij, target, module);
      createAgent = false;
      this.target = Url.parse(this.target);
      if (this.confij.options.http != null) {
        _ref = this.confij.options.http;
        for (key in _ref) {
          value = _ref[key];
          if (!(value != null)) {
            continue;
          }
          this.target[key] = value;
          if (__indexOf.call(HTTPS_OPTIONS, key) >= 0) {
            createAgent = true;
          }
        }
      }
      this.controller = this.target.protocol.test(/^https/i) ? require('https') : require('http');
      if (createAgent && !(this.target.agent != null)) {
        this.target.agent = new this.controller.Agent(this.target);
      }
    }

    HttpAdapter.prototype.load = function(callback) {
      var buffer, req,
        _this = this;
      buffer = '';
      this.target.method = 'GET';
      req = this.controller.request(this.target, function(res) {
        res.on('data', function(chunk) {
          return buffer += chunk;
        });
        return res.on('end', function() {
          return _this.confij.parse(buffer.toString(), function(err, data) {
            return callback(err, data);
          });
        });
      });
      req.on('error', function(err) {
        return callback(err);
      });
      return req.end();
    };

    HttpAdapter.prototype.save = function(data, callback) {
      var _this = this;
      return this.confij.stringify(data, function(err, buffer) {
        var req;
        if (err != null) {
          return callback(err);
        }
        _this.target.method = 'POST';
        req = _this.controller.request(_this.target, function(res) {
          return callback(null, buffer);
        });
        req.on('error', function(err) {
          return callback(err);
        });
        req.write(buffer);
        return req.end();
      });
    };

    return HttpAdapter;

  })(Adapter);

  module.exports = HttpAdapter;

}).call(this);
