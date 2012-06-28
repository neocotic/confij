Ini = require 'ini'

Format = require '../format'

# This Format provides support for configurations using the INI format.
#
# Both synchronous and asynchronous operations are supported.
#
# Options:
#   None
class IniFormat extends Format

  constructor: (confij) ->
    super confij, module

  parse: (str, callback) ->
    try
      callback null, Ini.parse str
    catch err
      callback err

  parseSync: (str) ->
    Ini.parse str

  stringify: (obj, callback) ->
    try
      callback null, Ini.stringify obj
    catch err
      callback err

  stringifySync: (obj) ->
    Ini.stringify obj

module.exports = IniFormat