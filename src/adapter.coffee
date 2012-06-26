class Adapter

  constructor: (@confij, @target) ->

  load: (callback) ->
    callback? new Error 'Unsupported operation: load'

  save: (data, callback) ->
    callback? new Error 'Unsupported operation: save'

module.exports = Adapter