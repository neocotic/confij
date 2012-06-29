{exec} = require 'child_process'
Coffee = require 'coffee-script'
Fs     = require 'fs'
Path   = require 'path'

ENCODING     = 'utf8'
R_COFFEE_EXT = /\.coffee$/i
SOURCE_DIR   = 'src'
TARGET_DIR   = 'lib'
TEST_DIR     = 'test'

# Helpers
# -------

# Compiles the `source` CoffeeScript file in to the `target` JavaScript file.
#
# source - A String path pointing to the CoffeeScript file to be compiled.
# target - A String path for the output JavaScript file.
#
# Returns nothing.
compile = (source, target) ->
  ws = Fs.createWriteStream target,
    encoding: ENCODING
    mode:     0o644

  ws.write Coffee.compile Fs.readFileSync source, ENCODING
  ws.end()

# Compiles all CoffeeScript files in the directory at the given `path`.
#
# path - Optional: A String path for the directory.
#
# Returns nothing.
compileAll = (path = SOURCE_DIR) ->
  target = path.replace SOURCE_DIR, TARGET_DIR

  unless Fs.existsSync target
    Fs.mkdirSync target

  for file in Fs.readdirSync path
    full = Path.join path, file

    if Fs.statSync(full).isDirectory()
      compileAll full
    else if R_COFFEE_EXT.test file
      compile full, Path.join target, file.replace R_COFFEE_EXT, '.js'

# Finds all matching files within the directory at the given `path`.
#
# path    - A String path for the directory.
# matcher - A Function used to filter the file results.
#
# Returns all matching files.
findAll = (path, matcher) ->
  results = []

  for file in Fs.readdirSync path
    full = Path.join path, file

    if Fs.statSync(full).isDirectory()
      results = results.concat findAll full, matcher
    else if matcher full
      results.push full

  results

# Removes the directory at the given `path` and all of its contents.
#
# path - A String path for the directory to be removed.
#
# Returns nothing.
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
  compileAll()

task 'test', 'Test library', ->
  tests = findAll TEST_DIR, (path) ->
    /\.js$/i.test path

  exec "tap #{tests.join ' '}", (err, stdout) ->
    if stdout
      console.log stdout
    else if err?
      throw err