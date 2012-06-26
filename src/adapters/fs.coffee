Fs   = require 'fs'
Path = require 'path'

Adapter = require '../adapter'

class FsAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target
    @confij.on 'ready', =>
      @target = Path.resolve @target

  load: (callback) ->
    Fs.readFile @target, @confij.options.fs?.encoding, (err, buffer) =>
      return callback err if err?
      @confij.format.parse buffer.toString(), (err, data) ->
        callback err, data

  save: (data, callback) ->
    @confij.format.stringify data, (err, buffer) =>
      return callback err if err?
      Fs.writeFile @target, buffer, @confij.options.fs?.encoding, (err) ->
        callback err

module.exports = FsAdapter