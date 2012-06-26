class Format

  constructor: (@confij) ->

  parse: (str, callback) ->
    callback? new Error 'Unsupported operation: parse'

  stringify: (obj, callback) ->
    callback? new Error 'Unsupported operation: stringify'

module.exports = Format