(function() {
  var Format, YamlFormat, Yamlish,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Yamlish = require('yamlish');

  Format = require('../format');

  YamlFormat = (function(_super) {

    __extends(YamlFormat, _super);

    function YamlFormat(confij) {
      YamlFormat.__super__.constructor.call(this, confij, module);
    }

    YamlFormat.prototype.parse = function(str, callback) {
      try {
        return callback(null, Yamlish.decode(str));
      } catch (err) {
        return callback(err);
      }
    };

    YamlFormat.prototype.parseSync = function(str) {
      return Yamlish.decode(str);
    };

    YamlFormat.prototype.stringify = function(obj, callback) {
      try {
        return callback(null, Yamlish.encode(obj));
      } catch (err) {
        return callback(err);
      }
    };

    YamlFormat.prototype.stringifySync = function(obj) {
      return Yamlish.encode(obj);
    };

    return YamlFormat;

  })(Format);

  module.exports = YamlFormat;

}).call(this);
