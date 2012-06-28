Http = require 'http'
Url  = require 'url'

Adapter = require '../adapter'

HTTP_OPTIONS = [
  'agent'
  'headers'
  'localAddress'
  'method'
  'socketPath'
]

# This Adapter allows HTTP requests to be used in order to send and receive
# configuration data.
#
# `target` should be a URI pointing to an endpoint which returns formatted
# configuration data in its response.
#
# Save operations will only work if supported by that endpoint.
#
# Only asynchronous operations are supported.
#
# Options:
#   agent        - http.Agent, false
#   headers      - Object
#   localAddress - String
#   method       - String
#   socketPath   - String
class HttpAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target, module

    @target = Url.parse @target

  load: (callback) ->
    buffer = ''
    req = Http.request @request('load'), (res) =>
      res.on 'data', (chunk) ->
        buffer += chunk
      res.on 'end', =>
        @confij.parse buffer.toString(), (err, data) ->
          callback err, data

    req.on 'error', (err) ->
      callback err

    req.end()

  # Private: Creates options for the `http.request` call using values taken
  # from the options for this Adapter.
  #
  # method - A String name of a method/namespace within the options.
  #
  # Returns Object for request.
  request: (method) ->
    request = {}

    for prop, value of @target
      request[prop] = value

    for option in HTTP_OPTIONS
      value = @option method, option
      request[option] = value if value?

    request

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) =>
      return callback err if err?
      req = Http.request @request('save'), (res) ->
        callback null, buffer

      req.on 'error', (err) ->
        callback err

      req.write buffer
      req.end()

module.exports = HttpAdapter