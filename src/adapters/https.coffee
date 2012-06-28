Https = require 'https'
Url   = require 'url'

Adapter = require '../adapter'

HTTP_OPTIONS = [
  'agent'
  'headers'
  'localAddress'
  'method'
  'socketPath'
]

HTTPS_OPTIONS = [
  'ca'
  'cert'
  'ciphers'
  'key'
  'passphrase'
  'pfx'
  'rejectUnauthorized'
]

# This Adapter allows secure HTTPS requests to be used in order to send and
# receive configuration data.
#
# `target` should be a URI pointing to an endpoint which returns formatted
# configuration data in its response.
#
# Save operations will only work if supported by that endpoint.
#
# If no `https.Agent` is provided in the options and one or more *https*
# options have been, an `https.Agent` is created using all of the options used.
#
# Only asynchronous operations are supported.
#
# Options:
#   agent              - https.Agent, false
#   ca                 - String, String[]
#   cert               - String
#   ciphers            - String
#   headers            - Object
#   key                - String
#   localAddress       - String
#   method             - String
#   passphrase         - String
#   pfx                - String
#   rejectUnauthorized - Boolean
#   socketPath         - String
class HttpsAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target, module

    @target = Url.parse @target

  load: (callback) ->
    buffer = ''
    req = Https.request @request('load'), (res) =>
      res.on 'data', (chunk) ->
        buffer += chunk
      res.on 'end', =>
        @confij.parse buffer.toString(), (err, data) ->
          callback err, data

    req.on 'error', (err) ->
      callback err

    req.end()

  # Private: Creates options for the `https.request` call using values taken
  # from the options for this Adapter.
  #
  # If no `https.Agent` is provided in the options and one or more *https*
  # options have been, an `https.Agent` is created using all of the options
  # used.
  #
  # method - A String name of a method/namespace within the options.
  #
  # Returns Object for request.
  request: (method) ->
    createAgent = no
    request     = {}

    for prop, value of @target
      request[prop] = value

    for option in HTTP_OPTIONS
      value = @option method, option
      request[option] = value if value?

    for option in HTTPS_OPTIONS
      value = @option method, option
      if value?
        request[option] = value if value?
        createAgent = yes

    if createAgent and not request.agent?
      request.agent = new Https.Agent request

    request

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) =>
      return callback err if err?
      req = Https.request @request('save'), (res) ->
        callback null, buffer

      req.on 'error', (err) ->
        callback err

      req.write buffer
      req.end()

module.exports = HttpsAdapter