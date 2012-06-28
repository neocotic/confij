Fs   = require 'fs'
Path = require 'path'

Adapter = require '../adapter'

# This Adapter enables read/write operations for configuration files on the
# file system.
#
# `target` should be a path referencing a formatted configuration file.
#
# Both synchronous and asynchronous operations are supported.
#
# Options:
#   encoding - String
class FsAdapter extends Adapter

  constructor: (confij, target) ->
    super confij, target, module

    @target = Path.resolve @target

  load: (callback) ->
    Fs.readFile @target, @option('load', 'encoding'), (err, buffer) =>
      return callback err if err?
      @confij.parse buffer.toString(), (err, data) ->
        callback err, data

  loadSync: ->
    buffer = Fs.readFileSync @target, @option 'loadSync', 'encoding'
    @confij.parseSync buffer.toString()

  save: (data, callback) ->
    @confij.stringify data, (err, buffer) =>
      return callback err if err?
      Fs.writeFile @target, buffer, @option('save', 'encoding'), (err) ->
        callback err, if err? then null else buffer

  saveSync: (data) ->
    buffer = @confij.stringifySync data
    Fs.writeFileSync @target, buffer, @option 'saveSync', 'encoding'
    buffer

module.exports = FsAdapter