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
      var _this = this;
      FsAdapter.__super__.constructor.call(this, confij, target);
      this.confij.on('ready', function() {
        return _this.target = Path.resolve(_this.target);
      });
    }

    FsAdapter.prototype.load = function(callback) {
      var _ref,
        _this = this;
      return Fs.readFile(this.target, (_ref = this.confij.options.fs) != null ? _ref.encoding : void 0, function(err, buffer) {
        if (err != null) {
          return callback(err);
        }
        return _this.confij.format.parse(buffer.toString(), function(err, data) {
          return callback(err, data);
        });
      });
    };

    FsAdapter.prototype.save = function(data, callback) {
      var _this = this;
      return this.confij.format.stringify(data, function(err, buffer) {
        var _ref;
        if (err != null) {
          return callback(err);
        }
        return Fs.writeFile(_this.target, buffer, (_ref = _this.confij.options.fs) != null ? _ref.encoding : void 0, function(err) {
          return callback(err);
        });
      });
    };

    return FsAdapter;

  })(Adapter);

  module.exports = FsAdapter;

}).call(this);
