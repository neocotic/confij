(function() {
  var Adapter, Path, Utils;

  Path = require('path');

  Utils = require('./utils');

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

    Adapter.prototype.loadSync = function() {
      throw new Error('Unsupported operation: loadSync');
    };

    Adapter.prototype.option = function(method, key) {
      var regex, result;
      regex = /sync$/i;
      result = Utils.derive(this.confij.options[this.name], method, key);
      if (!(result != null) && regex.test(method)) {
        return Utils.derive(this.confij.options[this.name], method.replace(regex, ''), key);
      } else {
        return result;
      }
    };

    Adapter.prototype.save = function(data, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: save')) : void 0;
    };

    Adapter.prototype.saveSync = function(data) {
      throw new Error('Unsupported operation: saveSync');
    };

    return Adapter;

  })();

  module.exports = Adapter;

}).call(this);
