Path = require 'path'

class Adapter

  # An adapter is a specific interface to a configuration source for confij.
  #
  # confij - A Confij instance.
  # target - A target configuration or a reference to its location.
  # module - Module of the child Adapter.
  constructor: (@confij, @target, module) ->
    if module?
      @name = Path.basename module.id, Path.extname module.id

  # Public: Raw method for loading a configuration. Extend this.
  #
  # callback - A Function that is called with the parsed data.
  #
  # Returns nothing.
  load: (callback) ->
    callback? new Error 'Unsupported operation: load'

  # Private: A helper Function for accessing relevant options within an
  # Adapter.
  #
  # Attempts to get the value of the given `key` from the namespace of the
  # specified `method` within this adapter's options. If no value is found here
  # it will fall back on the value from the adapter's root namespace where
  # possible.
  #
  # If no `key` is provided the best namespace will be returned.
  #
  # method - Optional: A String name of a method/namespace within the options.
  # key    - Optional: A String key.
  #
  # Returns the value of the given `key` or namespace Object.
  option: (method, key) ->
    root = @confij.options[@name]
    if key?
      if method?
        root?[method]?[key] ? root?[key]
      else
        root?[key]
    else
      if method? then root?[method] else root

  # Public: Raw method for saving a configuration. Extend this.
  #
  # data     - A configuration data object to be persisted.
  # callback - A Function that is called with the stringified data.
  #
  # Returns nothing.
  save: (data, callback) ->
    callback? new Error 'Unsupported operation: save'

module.exports = Adapter