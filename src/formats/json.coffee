Format = require '../format'

class JsonFormat extends Format

  parse: (str, callback) ->
    try
      callback null, JSON.parse str
    catch err
      callback err

  stringify: (obj, callback) ->
    try
      callback null, JSON.stringify obj
    catch err
      callback err

module.exports = JsonFormat