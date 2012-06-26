(function() {
  var Adapter, DefaultAdapter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Adapter = require('../adapter');

  DefaultAdapter = (function(_super) {

    __extends(DefaultAdapter, _super);

    function DefaultAdapter() {
      return DefaultAdapter.__super__.constructor.apply(this, arguments);
    }

    DefaultAdapter.prototype.load = function(callback) {
      return this.confij.format.parse(this.target, function(err, data) {
        return callback(err, data);
      });
    };

    return DefaultAdapter;

  })(Adapter);

  module.exports = DefaultAdapter;

}).call(this);
