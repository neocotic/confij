{EventEmitter} = require 'events'

Adapter = require './adapter'
Format  = require './format'

class Confij extends EventEmitter

  # Confij fetches and stores configuration data in a specific Format using an
  # Adapter.
  #
  # options - An object containing additional options for adapters and formats.
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
  # Returns nothing.
  load: (callback) ->
    @adapter.load (err, @data) =>
      callback? err, @data
      if err?
        @emit 'error', err
      else
        @emit 'loaded', @data

  # Public: A helper parse Function which delegates to the format's parse
  # Function.
  #
  # str      - A formatted configuration string.
  # callback - A Function that is called with the parsed data.
  #
  # Returns nothing.
  parse: (str, callback) ->
    @format.parse str, (err, obj) =>
      callback? err, obj
      if err?
        @emit 'error', err
      else
        @emit 'parsed', obj

  # Public: A helper save Function which delegates to the adapter's save
  # Function.
  #
  # data     - Optional: A configuration data object to be persisted.
  # callback - A Function that is called with the stringified data.
  #
  # Returns nothing.
  save: (data, callback) ->
    if 'function' is typeof data and not callback?
      callback = data
      data     = null

    @adapter.save data ? @data, (err, buffer) =>
      callback? err, buffer
      if err?
        @emit 'error', err
      else
        @emit 'saved', buffer

  # Public: A helper stringify Function which delegates to the format's
  # stringify Function.
  #
  # obj      - A configuration data object.
  # callback - A Function that is called with the stringified data.
  #
  # Returns nothing.
  stringify: (obj, callback) ->
    @format.stringify obj, (err, str) =>
      callback? err, str
      if err?
        @emit 'error', err
      else
        @emit 'stringified', str

  # Public: Uses the specified Adapter/Format implementation.
  #
  # impl - An implementation of an Adapter or Format.
  #
  # Returns nothing.
  use: (impl) ->
    return unless impl?
    if impl instanceof Adapter
      @adapter = impl
      @emit 'adapterLoaded', impl
    else if impl instanceof Format
      @format = impl
      @emit 'formatLoaded', impl

module.exports = Confij