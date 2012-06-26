(function() {
  var Adapter, Confij, DEFAULT_ADAPTER, Format, loadAdapter, loadFormat, resolveSource;

  Adapter = require('./adapter');

  Confij = require('./confij');

  Format = require('./format');

  DEFAULT_ADAPTER = 'default';

  module.exports.get = function(source, adapterName, options) {
    var confij;
    if (adapterName == null) {
      adapterName = DEFAULT_ADAPTER;
    }
    if (options == null) {
      options = {};
    }
    if ('object' === typeof adapterName) {
      options = adapterName;
      adapterName = DEFAULT_ADAPTER;
    }
    source = resolveSource(source, adapterName);
    confij = new Confij(options);
    confij.use(loadAdapter(adapterName, source.target, confij));
    confij.use(loadFormat(source.type, confij));
    return confij;
  };

  loadAdapter = function(adapterName, target, confij) {
    try {
      Adapter = require("./adapters/" + (adapterName != null ? adapterName.toLowerCase() : void 0));
      return new Adapter(confij, target);
    } catch (err) {
      throw new Error("Cannot load adapter " + adapterName + " - " + err + "\n" + err.stack);
    }
  };

  loadFormat = function(type, confij) {
    try {
      Format = require("./formats/" + (type != null ? type.toLowerCase() : void 0));
      return new Format(confij);
    } catch (err) {
      throw new Error("Cannot load format " + type + " - " + err + "\n" + err.stack);
    }
  };

  resolveSource = function(source, adapterName) {
    var key, newSource, value, _ref, _ref1;
    newSource = {};
    if ('object' === typeof source) {
      for (key in source) {
        value = source[key];
        if (!(value != null)) {
          continue;
        }
        newSource.target = value;
        newSource.type = key;
        break;
      }
    } else {
      newSource.target = source;
    }
    if ('function' === typeof newSource.target) {
      newSource.target = newSource.target();
    }
    if (!(newSource.type != null) && (adapterName === 'fs' || adapterName === 'http')) {
      newSource.type = (_ref = newSource.target) != null ? (_ref1 = _ref.match(/\.([^\.]+)$/)) != null ? _ref1[1] : void 0 : void 0;
    }
    return newSource;
  };

  module.exports.Adapter = Adapter;

  module.exports.Confij = Confij;

  module.exports.Format = Format;

}).call(this);
