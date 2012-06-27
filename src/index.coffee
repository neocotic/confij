Adapter = require './adapter'
Confij  = require './confij'
Format  = require './format'

DEFAULT_ADAPTER = 'default'

# Public: Creates a Confij instance for the information provided. This can then
# be used to fetch and store configuration data.
#
# source      - A String or Object targetting the configuration source.
# adapterName - Optional: A String of the Adapter name.
# options     - Optional: An object containing additional options for adapters
#               and formats.
#
# Returns a Confij instance.
module.exports.get = (source, adapterName = DEFAULT_ADAPTER, options = {}) ->
  if 'object' is typeof adapterName
    options     = adapterName
    adapterName = DEFAULT_ADAPTER

  source = resolveSource source, adapterName

  confij = new Confij options
  confij.use loadAdapter adapterName, confij, source.target
  confij.use loadFormat source.type, confij
  confij

# Private: Loads an Adapter with the specified `name`.
#
# name   - A String of the Adapter name.
# confij - A Confij instance.
# target - The target configuration or a reference to its location.
#
# Returns an Adapter instance.
loadAdapter = (name, confij, target) ->
  try
    Adapter = require "./adapters/#{name?.toLowerCase()}"
    new Adapter confij, target
  catch err
    throw new Error "Cannot load adapter #{name} - #{err}\n#{err.stack}"

# Private: Loads a Format for the specified `name`.
#
# name   - A String of the Format name.
# confij - A Confij instance.
#
# Returns a Format instance.
loadFormat = (name, confij) ->
  try
    Format = require "./formats/#{name?.toLowerCase()}"
    new Format confij
  catch err
    throw new Error "Cannot load format #{name} - #{err}\n#{err.stack}"

# Private: Derives the Format to be used and 
#
# source      - The String or Object targetting the configuration source.
# adapterName - A String of the Adapter name.
#
# Returns an improved source object.
resolveSource = (source, adapterName) ->
  newSource = {}
  if 'object' is typeof source
    for key, value of source when value?
      newSource.target = value
      newSource.type   = key
      break
  else
    newSource.target = source
  if 'function' is typeof newSource.target
    newSource.target = newSource.target()
  if not newSource.type? and adapterName in ['fs', 'http']
    newSource.type = newSource.target?.match(/\.([^\.]+)$/)?[1]
  newSource

module.exports.Adapter = Adapter
module.exports.Confij  = Confij
module.exports.Format  = Format