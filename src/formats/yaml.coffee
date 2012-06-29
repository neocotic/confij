Yaml = require 'js-yaml'

Format = require '../format'

# This Format provides support for configurations using the YAML format using
# the `js-yaml` package for parsing.
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
      callback null, Yaml.load str
    catch err
      callback err

  parseSync: (str) ->
    Yaml.load str

  # TODO: Provide support
  stringify: (obj, callback) ->
    super obj, callback

  # TODO: Provide support
  stringifySync: (obj) ->
    super obj

module.exports = YamlFormat