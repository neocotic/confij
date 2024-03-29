(function() {
  var Adapter, HTTP_OPTIONS, Http, HttpAdapter, Url,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Http = require('http');

  Url = require('url');

  Adapter = require('../adapter');

  HTTP_OPTIONS = ['agent', 'headers', 'localAddress', 'method', 'socketPath'];

  HttpAdapter = (function(_super) {

    __extends(HttpAdapter, _super);

    function HttpAdapter(confij, target) {
      HttpAdapter.__super__.constructor.call(this, confij, target, module);
      this.target = Url.parse(this.target);
    }

    HttpAdapter.prototype.load = function(callback) {
      var buffer, req,
        _this = this;
      buffer = '';
      req = Http.request(this.request('load'), function(res) {
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

    HttpAdapter.prototype.request = function(method) {
      var option, prop, request, value, _i, _len, _ref;
      request = {};
      _ref = this.target;
      for (prop in _ref) {
        value = _ref[prop];
        request[prop] = value;
      }
      for (_i = 0, _len = HTTP_OPTIONS.length; _i < _len; _i++) {
        option = HTTP_OPTIONS[_i];
        value = this.option(method, option);
        if (value != null) {
          request[option] = value;
        }
      }
      return request;
    };

    HttpAdapter.prototype.save = function(data, callback) {
      var _this = this;
      return this.confij.stringify(data, function(err, buffer) {
        var req;
        if (err != null) {
          return callback(err);
        }
        req = Http.request(_this.request('save'), function(res) {
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
