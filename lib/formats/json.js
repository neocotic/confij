(function() {
  var Format, JsonFormat,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Format = require('../format');

  JsonFormat = (function(_super) {

    __extends(JsonFormat, _super);

    function JsonFormat(confij) {
      JsonFormat.__super__.constructor.call(this, confij, module);
    }

    JsonFormat.prototype.parse = function(str, callback) {
      try {
        return callback(null, JSON.parse(str));
      } catch (err) {
        return callback(err);
      }
    };

    JsonFormat.prototype.parseSync = function(str) {
      return JSON.parse(str);
    };

    JsonFormat.prototype.stringify = function(obj, callback) {
      try {
        return callback(null, JSON.stringify(obj));
      } catch (err) {
        return callback(err);
      }
    };

    JsonFormat.prototype.stringifySync = function(obj) {
      return JSON.stringify(obj);
    };

    return JsonFormat;

  })(Format);

  module.exports = JsonFormat;

}).call(this);
