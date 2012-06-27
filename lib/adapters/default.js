(function() {
  var Adapter, DefaultAdapter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Adapter = require('../adapter');

  DefaultAdapter = (function(_super) {

    __extends(DefaultAdapter, _super);

    function DefaultAdapter(confij, target) {
      DefaultAdapter.__super__.constructor.call(this, confij, target, module);
    }

    DefaultAdapter.prototype.load = function(callback) {
      return this.confij.parse(this.target, function(err, data) {
        return callback(err, data);
      });
    };

    DefaultAdapter.prototype.save = function(data, callback) {
      return this.confij.stringify(data, function(err, buffer) {
        return callback(err, buffer);
      });
    };

    return DefaultAdapter;

  })(Adapter);

  module.exports = DefaultAdapter;

}).call(this);
