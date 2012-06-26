(function() {
  var Adapter;

  Adapter = (function() {

    function Adapter(confij, target) {
      this.confij = confij;
      this.target = target;
    }

    Adapter.prototype.load = function(callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: load')) : void 0;
    };

    Adapter.prototype.save = function(data, callback) {
      return typeof callback === "function" ? callback(new Error('Unsupported operation: save')) : void 0;
    };

    return Adapter;

  })();

  module.exports = Adapter;

}).call(this);
