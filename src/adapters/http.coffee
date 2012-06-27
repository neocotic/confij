Url = require 'url'

Adapter = require '../adapter'

HTTPS_OPTIONS = ['ca', 'cert', 'key', 'passphrase', 'pfx']

# Options:
#
# agent http.Agent, false
# ca (String|String[]) - https only
# cert (String) - https only
# headers (Object)
# key (String) - https only
# method (String)
# passphrase (String) - https only
# pfx (String) - https only
# socketPath (String)
class HttpAdapter extends Adapter

  # TODO: Improve how options are used!
  # - Derive options for request within methods so namespace options are used.
  # TODO: Consider creating separate Adapter for HTTPS.
  constructor: (confij, target) ->
    super confij, target, module

    createAgent = no
    @target     = Url.parse @target

    if @confij.options.http?
      for key, value of @confij.options.http when value?
        @target[key] = value
        createAgent = yes if key in HTTPS_OPTIONS

    @controller = if @target.protocol.test /^https/i
      require 'https'
    else
      require 'http'

    if createAgent and not @target.agent?
      @target.agent = new @controller.Agent @target

  load: (callback) ->
    buffer = ''
    @target.method = 'GET'
    req = @controller.request @target, (res) =>
      res.on 'data', (chunk) ->
        buffer += chunk
      res.on 'end', =>
        @confij.parse buffer.toString(), (err, data) ->
          callback err, data

    req.on 'error', (err) ->
      callback err

    req.end()

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) =>
      return callback err if err?
      @target.method = 'POST'
      req = @controller.request @target, (res) ->
        callback null, buffer

      req.on 'error', (err) ->
        callback err

      req.write buffer
      req.end()

module.exports = HttpAdapter