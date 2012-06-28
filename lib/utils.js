(function() {

  module.exports.derive = function(obj, child, key) {
    var _ref, _ref1, _ref2;
    if (this.isObject(child)) {
      _ref = this.unmap(child), child = _ref[0], key = _ref[1];
    }
    if (key != null) {
      if (child != null) {
        return (_ref1 = obj != null ? (_ref2 = obj[child]) != null ? _ref2[key] : void 0 : void 0) != null ? _ref1 : obj != null ? obj[key] : void 0;
      } else {
        return obj != null ? obj[key] : void 0;
      }
    } else {
      if (child != null) {
        return obj != null ? obj[child] : void 0;
      } else {
        return obj;
      }
    }
  };

  module.exports.isFunction = function(obj) {
    return this.isType(obj, 'function');
  };

  module.exports.isObject = function(obj) {
    return this.isType(obj, 'object');
  };

  module.exports.isType = function(obj, type) {
    return type === typeof obj;
  };

  module.exports.unmap = function(obj) {
    var key, result, value;
    result = [];
    for (key in obj) {
      value = obj[key];
      if (!(value != null)) {
        continue;
      }
      result.push(key);
      result.push(value);
      break;
    }
    return result;
  };

}).call(this);
