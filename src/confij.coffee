{EventEmitter} = require 'events'

Adapter = require './adapter'
Format  = require './format'

class Confij extends EventEmitter

  constructor: (@options) ->
    isReady = ->
      if @adapter and @format
        @emit 'ready'

    @once 'adapterLoaded', isReady
    @once 'formatLoaded', isReady

  load: (callback) ->
    @adapter.load (err, data) =>
      callback? err, data
      if err?
        @emit 'error', err
      else
        @emit 'loaded', data

  save: (data, callback) ->
    @adapter.save data, (err) =>
      callback? err
      if err?
        @emit 'error', err
      else
        @emit 'saved', data

  use: (impl) ->
    return unless impl?
    if impl instanceof Adapter
      @adapter = impl
      @emit 'adapterLoaded', impl
    else if impl instanceof Format
      @format = impl
      @emit 'formatLoaded', impl

module.exports = Confij