Yamlish = require 'yamlish'

Format = require '../format'

class YamlFormat extends Format

  constructor: (confij) ->
    super confij, module

  parse: (str, callback) ->
    try
      callback null, Yamlish.decode str
    catch err
      callback err

  stringify: (obj, callback) ->
    try
      callback null, Yamlish.encode obj
    catch err
      callback err

module.exports = YamlFormat