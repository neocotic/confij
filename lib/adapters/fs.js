(function() {
  var Adapter, Fs, FsAdapter, Path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Fs = require('fs');

  Path = require('path');

  Adapter = require('../adapter');

  FsAdapter = (function(_super) {

    __extends(FsAdapter, _super);

    function FsAdapter(confij, target) {
      FsAdapter.__super__.constructor.call(this, confij, target, module);
      this.target = Path.resolve(this.target);
    }

    FsAdapter.prototype.load = function(callback) {
      var _this = this;
      return Fs.readFile(this.target, this.option('load', 'encoding'), function(err, buffer) {
        if (err != null) {
          return callback(err);
        }
        return _this.confij.parse(buffer.toString(), function(err, data) {
          return callback(err, data);
        });
      });
    };

    FsAdapter.prototype.save = function(data, callback) {
      var _this = this;
      return this.confij.stringify(data, function(err, buffer) {
        if (err != null) {
          return callback(err);
        }
        return Fs.writeFile(_this.target, buffer, _this.option('save', 'encoding'), function(err) {
          return callback(err, err != null ? null : buffer);
        });
      });
    };

    return FsAdapter;

  })(Adapter);

  module.exports = FsAdapter;

}).call(this);
