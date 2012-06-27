(function() {
  var Format, Ini, IniFormat,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ini = require('ini');

  Format = require('../format');

  IniFormat = (function(_super) {

    __extends(IniFormat, _super);

    function IniFormat(confij) {
      IniFormat.__super__.constructor.call(this, confij, module);
    }

    IniFormat.prototype.parse = function(str, callback) {
      try {
        return callback(null, Ini.parse(str));
      } catch (err) {
        return callback(err);
      }
    };

    IniFormat.prototype.stringify = function(obj, callback) {
      try {
        return callback(null, Ini.stringify(obj));
      } catch (err) {
        return callback(err);
      }
    };

    return IniFormat;

  })(Format);

  module.exports = IniFormat;

}).call(this);
