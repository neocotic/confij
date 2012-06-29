(function() {
  var Format, Yaml, YamlFormat,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Yaml = require('js-yaml');

  Format = require('../format');

  YamlFormat = (function(_super) {

    __extends(YamlFormat, _super);

    function YamlFormat(confij) {
      YamlFormat.__super__.constructor.call(this, confij, module);
    }

    YamlFormat.prototype.parse = function(str, callback) {
      try {
        return callback(null, Yaml.load(str));
      } catch (err) {
        return callback(err);
      }
    };

    YamlFormat.prototype.parseSync = function(str) {
      return Yaml.load(str);
    };

    YamlFormat.prototype.stringify = function(obj, callback) {
      return YamlFormat.__super__.stringify.call(this, obj, callback);
    };

    YamlFormat.prototype.stringifySync = function(obj) {
      return YamlFormat.__super__.stringifySync.call(this, obj);
    };

    return YamlFormat;

  })(Format);

  module.exports = YamlFormat;

}).call(this);
