(function() {
  var Adapter, HTTPS_OPTIONS, Http, HttpAdapter, Https, Url,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Http = require('http');

  Https = require('https');

  Url = require('url');

  Adapter = require('../adapter');

  HTTPS_OPTIONS = ['ca', 'cert', 'key', 'passphrase', 'pfx'];

  HttpAdapter = (function(_super) {

    __extends(HttpAdapter, _super);

    function HttpAdapter(confij, target) {
      var _this = this;
      HttpAdapter.__super__.constructor.call(this, confij, target);
      this.confij.on('ready', function() {
        var createAgent, key, value, _ref;
        createAgent = false;
        _this.target = Url.parse(_this.target);
        if (_this.confij.options.http != null) {
          _ref = _this.confij.options.http;
          for (key in _ref) {
            value = _ref[key];
            if (!(value != null)) {
              continue;
            }
            _this.target[key] = value;
            if (__indexOf.call(HTTPS_OPTIONS, key) >= 0) {
              createAgent = true;
            }
          }
        }
        _this.controller = _this.target.protocol.test(/^https/i) ? Https : Http;
        if (createAgent && !(_this.target.agent != null)) {
          return _this.target.agent = new _this.controller.Agent(_this.target);
        }
      });
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
          return _this.confij.format.parse(buffer.toString(), function(err, data) {
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
      return this.confij.format.stringify(data, function(err, buffer) {
        var req;
        if (err != null) {
          return callback(err);
        }
        _this.target.method = 'POST';
        req = _this.controller.request(_this.target, function(res) {});
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
