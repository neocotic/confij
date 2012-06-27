Fs   = require 'fs'
Path = require 'path'

Adapter = require '../adapter'

# Options:
#
# encoding - String
class FsAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target, module

    @target = Path.resolve @target

  load: (callback) ->
    Fs.readFile @target, @option('load', 'encoding'), (err, buffer) =>
      return callback err if err?
      @confij.parse buffer.toString(), (err, data) ->
        callback err, data

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) =>
      return callback err if err?
      Fs.writeFile @target, buffer, @option('save', 'encoding'), (err) ->
        callback err, if err? then null else buffer

module.exports = FsAdapter