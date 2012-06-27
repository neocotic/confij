# Module dependencies
# -------------------

{exec} = require 'child_process'
Coffee = require 'coffee-script'
Fs     = require 'fs'
Path   = require 'path'

# Files & directories
# -------------------

SOURCE_DIR = 'src'
TARGET_DIR = 'lib'
TEST_DIR   = 'test'

# Constants
# ---------

ENCODING = 'utf8'
MODE     = 0o777

# Helpers
# -------

compile = (from, to) ->
  ws = Fs.createWriteStream to.replace(/\.coffee$/i, '.js'),
    encoding: ENCODING
    mode:     MODE
  ws.end Coffee.compile(Fs.readFileSync from, ENCODING), ENCODING

compileAll = (path = SOURCE_DIR) ->
  target = path.replace SOURCE_DIR, TARGET_DIR
  unless Fs.existsSync target
    Fs.mkdirSync target
  for file in Fs.readdirSync path
    full = Path.join path, file
    if Fs.statSync(full).isDirectory()
      compileAll full
    else if /\.coffee$/i.test file
      compile full, Path.join target, file

findAll = (path, ext) ->
  results = []
  for file in Fs.readdirSync path
    full = Path.join path, file
    if Fs.statSync(full).isDirectory()
      results = results.concat findAll full
    else if ext is Path.extname file
      results.push full
  results

removeAll = (path) ->
  if Fs.existsSync path
    for file in Fs.readdirSync path
      full = Path.join path, file
      if Fs.statSync(full).isDirectory()
        removeAll full
      else
        Fs.unlinkSync full
    Fs.rmdirSync path

# Tasks
# -----

task 'build', 'Build library', ->
  removeAll TARGET_DIR
  do compileAll

task 'test', 'Test library', ->
  exec "tap #{findAll(TEST_DIR, '.js').join ' '}", (err, stdout) ->
    if stdout
      console.log stdout
    else if err?
      throw err