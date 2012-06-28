Yamlish = require 'yamlish'

Format = require '../format'

# This Format provides support for configurations using the YAML format.
#
# Both synchronous and asynchronous operations are supported.
#
# Options:
#   None
class YamlFormat extends Format

  constructor: (confij) ->
    super confij, module

  parse: (str, callback) ->
    try
      callback null, Yamlish.decode str
    catch err
      callback err

  parseSync: (str) ->
    Yamlish.decode str

  stringify: (obj, callback) ->
    try
      callback null, Yamlish.encode obj
    catch err
      callback err

  stringifySync: (obj) ->
    Yamlish.encode obj

module.exports = YamlFormat