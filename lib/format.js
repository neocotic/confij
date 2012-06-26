(function() {
  var Format;

  Format = (function() {

    function Format(confij) {
      this.confij = confij;
    }

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
