(function() {
  var Format, Path;

  Path = require('path');

  Format = (function() {

    function Format(confij, module) {
      this.confij = confij;
      if (module != null) {
        this.name = Path.basename(module.id, Path.extname(module.id));
      }
    }

    Format.prototype.option = function(method, key) {
      var root, _ref, _ref1;
      root = this.confij.options[this.name];
      if (key != null) {
        if (method != null) {
          return (_ref = root != null ? (_ref1 = root[method]) != null ? _ref1[key] : void 0 : void 0) != null ? _ref : root != null ? root[key] : void 0;
        } else {
          return root != null ? root[key] : void 0;
        }
      } else {
        if (method != null) {
          return root != null ? root[method] : void 0;
        } else {
          return root;
        }
      }
    };

    Format.prototype.parse = function(str, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: parse')) : void 0;
    };

    Format.prototype.stringify = function(obj, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: stringify')) : void 0;
    };

    return Format;

  })();

  module.exports = Format;

}).call(this);
