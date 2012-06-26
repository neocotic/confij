Adapter = require '../adapter'

class DefaultAdapter extends Adapter

  load: (callback) ->
    @confij.format.parse @target, (err, data) ->
      callback err, data

module.exports = DefaultAdapter