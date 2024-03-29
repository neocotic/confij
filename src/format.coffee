Path = require 'path'

Utils = require './utils'

class Format

  # A format is a specific interface to a configuration format for confij.
  #
  # confij - A Confij instance.
  # module - Module of the child Format.
  constructor: (@confij, module) ->
    if module?
      @name = Path.basename module.id, Path.extname module.id

  # Private: A helper Function for accessing relevant options within an
  # Format.
  #
  # Attempts to get the value of the given `key` from the namespace of the
  # specified `method` within this format's options. If no value is found here
  # it will fall back on the value from the format's root namespace where
  # possible.
  #
  # If no `key` is provided the best namespace will be returned.
  #
  # method - Optional: A String name of a method/namespace within the options.
  # key    - Optional: A String key.
  #
  # Returns the value of the given `key` or namespace Object.
  option: (method, key) ->
    regex  = /sync$/i
    result = Utils.derive @confij.options[@name], method, key

    if not result? and regex.test method
      Utils.derive @confij.options[@name], method.replace(regex, ''), key
    else
      result

  # Public: Raw method for parsing a formatted configuration String. Extend
  # this.
  #
  # str      - A formatted configuration String.
  # callback - A Function that is called with the parsed data.
  #
  # Returns nothing.
  parse: (str, callback) ->
    callback? new Error 'Unsupported operation: parse'

  # Public: Synchronous version of `Format.parse`.
  #
  # str - A formatted configuration String.
  #
  # Returns the parsed data.
  parseSync: (str) ->
    throw new Error 'Unsupported operation: parseSync'

  # Public: Raw method for transforming configuration data into a formatted
  # String. Extend this.
  #
  # obj      - A configuration data Object.
  # callback - A Function that is called with the stringified data.
  #
  # Returns nothing.
  stringify: (obj, callback) ->
    callback? new Error 'Unsupported operation: stringify'

  # Public: Synchronous version of `Format.stringify`.
  #
  # obj - A configuration data Object.
  #
  # Returns the stringified data.
  stringifySync: (obj) ->
    throw new Error 'Unsupported operation: stringifySync'

module.exports = Format