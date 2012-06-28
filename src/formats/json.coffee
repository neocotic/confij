Format = require '../format'

# This Format provides support for configurations using the JSON format.
#
# Both synchronous and asynchronous operations are supported.
#
# Options:
#   None
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
      callback null, JSON.stringify obj
    catch err
      callback err

  stringifySync: (obj) ->
    JSON.stringify obj

module.exports = JsonFormat