{EventEmitter} = require 'events'

Adapter = require './adapter'
Format  = require './format'
Utils   = require './utils'

class Confij extends EventEmitter

  # Confij fetches and stores configuration data in a specific Format using an
  # Adapter.
  #
  # options - An Object containing additional options for adapters and formats.
  constructor: (@options = {}) ->
    isReady = ->
      if @adapter and @format
        @emit 'ready'

    @once 'adapterLoaded', isReady
    @once 'formatLoaded', isReady

  # Public: A helper load Function which delegates to the adapter's load
  # Function.
  #
  # callback - A Function that is called with the parsed data.
  #
  # Returns this instance of Confij.
  load: (callback) ->
    @adapter.load (err, @data) =>
      if Utils.isFunction callback
        callback err, @data
      else
        if err?
          @emit 'error', err
        else
          @emit 'loaded', @data

    @

  # Public: Synchronous version of `Confij.load`.
  #
  # Returns the parsed data.
  loadSync: ->
    try
      @data = @adapter.loadSync()
    catch err
      @emit 'error', err

    @emit 'loaded', @data

    @data

  # Public: A helper parse Function which delegates to the format's parse
  # Function.
  #
  # str      - A formatted configuration String.
  # callback - A Function that is called with the parsed data.
  #
  # Returns this instance of Confij.
  parse: (str, callback) ->
    @format.parse str, (err, obj) =>
      if Utils.isFunction callback
        callback err, obj
      else
        if err?
          @emit 'error', err
        else
          @emit 'parsed', obj

    @

  # Public: Synchronous version of `Confij.parse`.
  #
  # str - A formatted configuration String.
  #
  # Returns the parsed data.
  parseSync: (str) ->
    try
      obj = @format.parseSync str
    catch err
      @emit 'error', err

    @emit 'parsed', obj

    obj

  # Public: A helper save Function which delegates to the adapter's save
  # Function.
  #
  # data     - Optional: A configuration data Object to be persisted.
  # callback - A Function that is called with the stringified data.
  #
  # Returns this instance of Confij.
  save: (data, callback) ->
    if Utils.isFunction(data) and not callback?
      callback = data
      data     = null

    @data = data if data?

    @adapter.save @data, (err, buffer) =>
      if Utils.isFunction callback
        callback err, buffer
      else
        if err?
          @emit 'error', err
        else
          @emit 'saved', buffer

    @

  # Public: Synchronous version of `Confij.save`.
  #
  # data - Optional: A configuration data Object to be persisted.
  #
  # Returns the stringified data.
  saveSync: (data) ->
    @data = data if data?

    try
      buffer = @adapter.saveSync @data
    catch err
      @emit 'error', err

    @emit 'saved', buffer

    buffer

  # Public: A helper stringify Function which delegates to the format's
  # stringify Function.
  #
  # obj      - A configuration data Object.
  # callback - A Function that is called with the stringified data.
  #
  # Returns this instance of Confij.
  stringify: (obj, callback) ->
    @format.stringify obj, (err, str) =>
      if Utils.isFunction callback
        callback err, str
      else
        if err?
          @emit 'error', err
        else
          @emit 'stringified', str

    @

  # Public: Synchronous version of `Confij.stringify`.
  #
  # obj - A configuration data Object.
  #
  # Returns the stringified data.
  stringifySync: (obj) ->
    try
      str = @format.stringifySync obj
    catch err
      @emit 'error', err

    @emit 'stringified', str

    str

  # Public: Uses the specified Adapter/Format implementation.
  #
  # impl - An implementation of an Adapter or Format.
  #
  # Returns this instance of Confij.
  use: (impl) ->
    return unless impl?

    if impl instanceof Adapter
      @adapter = impl
      @emit 'adapterLoaded', impl
    else if impl instanceof Format
      @format = impl
      @emit 'formatLoaded', impl

    @

module.exports = Confij