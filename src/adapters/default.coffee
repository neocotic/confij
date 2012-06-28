Adapter = require '../adapter'

# This is the default Adapter and is the most basic implementation that simply
# relays the requests to the corresponding Format methods and handles the
# response.
#
# `target` should be a formatted String and clearly nothing can be persisted
# for this reason.
#
# Both synchronous and asynchronous operations are supported.
#
# Options:
#   None
class DefaultAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target, module

  load: (callback) ->
    @confij.parse @target, (err, data) ->
      callback err, data

  loadSync: ->
    @confij.parseSync @target

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) ->
      callback err, buffer

  saveSync: (data) ->
    @confij.stringifySync data

module.exports = DefaultAdapter