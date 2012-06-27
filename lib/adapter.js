(function() {
  var Adapter, Path;

  Path = require('path');

  Adapter = (function() {

    function Adapter(confij, target, module) {
      this.confij = confij;
      this.target = target;
      if (module != null) {
        this.name = Path.basename(module.id, Path.extname(module.id));
      }
    }

    Adapter.prototype.load = function(callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: load')) : void 0;
    };

    Adapter.prototype.option = function(method, key) {
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

    Adapter.prototype.save = function(data, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: save')) : void 0;
    };

    return Adapter;

  })();

  module.exports = Adapter;

}).call(this);
