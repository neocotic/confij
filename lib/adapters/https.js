(function() {
  var Adapter, HTTPS_OPTIONS, HTTP_OPTIONS, Https, HttpsAdapter, Url,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Https = require('https');

  Url = require('url');

  Adapter = require('../adapter');

  HTTP_OPTIONS = ['agent', 'headers', 'localAddress', 'method', 'socketPath'];

  HTTPS_OPTIONS = ['ca', 'cert', 'ciphers', 'key', 'passphrase', 'pfx', 'rejectUnauthorized'];

  HttpsAdapter = (function(_super) {

    __extends(HttpsAdapter, _super);

    function HttpsAdapter(confij, target) {
      HttpsAdapter.__super__.constructor.call(this, confij, target, module);
      this.target = Url.parse(this.target);
    }

    HttpsAdapter.prototype.load = function(callback) {
      var buffer, req,
        _this = this;
      buffer = '';
      req = Https.request(this.request('load'), function(res) {
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

    HttpsAdapter.prototype.request = function(method) {
      var createAgent, option, prop, request, value, _i, _j, _len, _len1, _ref;
      createAgent = false;
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
      for (_j = 0, _len1 = HTTPS_OPTIONS.length; _j < _len1; _j++) {
        option = HTTPS_OPTIONS[_j];
        value = this.option(method, option);
        if (value != null) {
          if (value != null) {
            request[option] = value;
          }
          createAgent = true;
        }
      }
      if (createAgent && !(request.agent != null)) {
        request.agent = new Https.Agent(request);
      }
      return request;
    };

    HttpsAdapter.prototype.save = function(data, callback) {
      var _this = this;
      return this.confij.stringify(data, function(err, buffer) {
        var req;
        if (err != null) {
          return callback(err);
        }
        req = Https.request(_this.request('save'), function(res) {
          return callback(null, buffer);
        });
        req.on('error', function(err) {
          return callback(err);
        });
        req.write(buffer);
        return req.end();
      });
    };

    return HttpsAdapter;

  })(Adapter);

  module.exports = HttpsAdapter;

}).call(this);
