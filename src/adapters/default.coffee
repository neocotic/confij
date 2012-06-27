Adapter = require '../adapter'

class DefaultAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target, module

  load: (callback) ->
    @confij.parse @target, (err, data) ->
      callback err, data

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) ->
      callback err, buffer

module.exports = DefaultAdapter