Http  = require 'http'
Https = require 'https'
Url   = require 'url'

Adapter = require '../adapter'

HTTPS_OPTIONS = ['ca', 'cert', 'key', 'passphrase', 'pfx']

class HttpAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target
    @confij.on 'ready', =>
      createAgent = no
      @target     = Url.parse @target

      if @confij.options.http?
        for key, value of @confij.options.http when value?
          @target[key] = value
          createAgent = yes if key in HTTPS_OPTIONS

      @controller = if @target.protocol.test /^https/i then Https else Http
      if createAgent and not @target.agent?
          @target.agent = new @controller.Agent @target

  load: (callback) ->
    buffer = ''
    @target.method = 'GET'
    req = @controller.request @target, (res) =>
      res.on 'data', (chunk) ->
        buffer += chunk
      res.on 'end', =>
        @confij.format.parse buffer.toString(), (err, data) ->
          callback err, data

    req.on 'error', (err) ->
      callback err

    req.end()

  save: (data, callback) ->
    @confij.format.stringify data, (err, buffer) =>
      return callback err if err?
      @target.method = 'POST'
      req = @controller.request @target, (res) ->

      req.on 'error', (err) ->
        callback err

      req.write buffer
      req.end()

module.exports = HttpAdapter