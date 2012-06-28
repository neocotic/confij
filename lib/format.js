(function() {
  var Format, Path, Utils;

  Path = require('path');

  Utils = require('./utils');

  Format = (function() {

    function Format(confij, module) {
      this.confij = confij;
      if (module != null) {
        this.name = Path.basename(module.id, Path.extname(module.id));
      }
    }

    Format.prototype.option = function(method, key) {
      var regex, result;
      regex = /sync$/i;
      result = Utils.derive(this.confij.options[this.name], method, key);
      if (!(result != null) && regex.test(method)) {
        return Utils.derive(this.confij.options[this.name], method.replace(regex, ''), key);
      } else {
        return result;
      }
    };

    Format.prototype.parse = function(str, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: parse')) : void 0;
    };

    Format.prototype.parseSync = function(str) {
      throw new Error('Unsupported operation: parseSync');
    };

    Format.prototype.stringify = function(obj, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: stringify')) : void 0;
    };

    Format.prototype.stringifySync = function(obj) {
      throw new Error('Unsupported operation: stringifySync');
    };

    return Format;

  })();

  module.exports = Format;

}).call(this);
