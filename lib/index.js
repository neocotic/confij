(function() {
  var Adapter, Confij, DEFAULT_ADAPTER, Format, Utils, loadAdapter, loadFormat, resolveSource;

  Adapter = require('./adapter');

  Confij = require('./confij');

  Format = require('./format');

  Utils = require('./utils');

  DEFAULT_ADAPTER = 'default';

  module.exports.get = function(source, adapterName, options) {
    var confij;
    if (adapterName == null) {
      adapterName = DEFAULT_ADAPTER;
    }
    if (options == null) {
      options = {};
    }
    if (Utils.isObject(adapterName)) {
      options = adapterName;
      adapterName = DEFAULT_ADAPTER;
    }
    source = resolveSource(source, adapterName);
    confij = new Confij(options);
    confij.use(loadAdapter(adapterName, confij, source.target));
    confij.use(loadFormat(source.type, confij));
    return confij;
  };

  loadAdapter = function(name, confij, target) {
    try {
      Adapter = require("./adapters/" + (name != null ? name.toLowerCase() : void 0));
      return new Adapter(confij, target);
    } catch (err) {
      throw new Error("Cannot load adapter " + name + " - " + err + "\n" + err.stack);
    }
  };

  loadFormat = function(name, confij) {
    try {
      Format = require("./formats/" + (name != null ? name.toLowerCase() : void 0));
      return new Format(confij);
    } catch (err) {
      throw new Error("Cannot load format " + name + " - " + err + "\n" + err.stack);
    }
  };

  resolveSource = function(source, adapterName) {
    var newSource, _ref, _ref1, _ref2;
    newSource = {};
    if (Utils.isObject(source)) {
      _ref = Utils.unmap(source), newSource.type = _ref[0], newSource.target = _ref[1];
    } else {
      newSource.target = source;
    }
    if (Utils.isFunction(newSource.target)) {
      newSource.target = newSource.target();
    }
    if (!(newSource.type != null) && (adapterName === 'fs' || adapterName === 'http')) {
      newSource.type = (_ref1 = newSource.target) != null ? (_ref2 = _ref1.match(/\.([^\.]+)$/)) != null ? _ref2[1] : void 0 : void 0;
    }
    return newSource;
  };

  module.exports.Adapter = Adapter;

  module.exports.Confij = Confij;

  module.exports.Format = Format;

}).call(this);
