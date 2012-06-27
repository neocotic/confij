Ini = require 'ini'

Format = require '../format'

class IniFormat extends Format

  constructor: (confij) ->
    super confij, module

  parse: (str, callback) ->
    try
      callback null, Ini.parse str
    catch err
      callback err

  stringify: (obj, callback) ->
    try
      callback null, Ini.stringify obj
    catch err
      callback err

module.exports = IniFormat