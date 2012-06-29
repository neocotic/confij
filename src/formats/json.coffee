Format = require '../format'

# This Format provides support for configurations using the JSON format using
# the built-in `JSON` namespace for parsing and stringifying.
#
# Both synchronous and asynchronous operations are supported.
#
# Options:
#   indent - Number
class JsonFormat extends Format

  constructor: (confij) ->
    super confij, module

  parse: (str, callback) ->
    try
      callback null, JSON.parse str
    catch err
      callback err

  parseSync: (str) ->
    JSON.parse str

  stringify: (obj, callback) ->
    try
      indent = @option 'stringify', 'indent'
      callback null, JSON.stringify obj, null, indent ? 2
    catch err
      callback err

  stringifySync: (obj) ->
    indent = @option 'stringify', 'indent'
    JSON.stringify obj, null, indent ? 2

module.exports = JsonFormat