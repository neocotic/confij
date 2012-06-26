Adapter = require './adapter'
Confij  = require './confij'
Format  = require './format'

DEFAULT_ADAPTER = 'default'

# get(source, adapterName, options)
# get(source, adapterName)
# get(source, options)
# get(source)
#
# source: (Function|Object|String)
#   function() {return "target"}
#   "format": "target"
#   "target"
#
# adapterName: (String)
#   default
#   fs
#   http
#
# options: (Object)
#   fs:
#     encoding (String)
#   http:
#     agent (http.Agent|Boolean)
#     ca (String|String[]) - https only
#     cert (String) - https only
#     headers (Object)
#     key (String) - https only
#     passphrase (String) - https only
#     pfx (String) - https only
#     socketPath (String)
module.exports.get = (source, adapterName = DEFAULT_ADAPTER, options = {}) ->
  if 'object' is typeof adapterName
    options     = adapterName
    adapterName = DEFAULT_ADAPTER

  source = resolveSource source, adapterName

  confij = new Confij options
  confij.use loadAdapter adapterName, source.target, confij
  confij.use loadFormat source.type, confij
  confij

loadAdapter = (adapterName, target, confij) ->
  try
    Adapter = require "./adapters/#{adapterName?.toLowerCase()}"
    new Adapter confij, target
  catch err
    throw new Error "Cannot load adapter #{adapterName} - #{err}\n#{err.stack}"

loadFormat = (type, confij) ->
  try
    Format = require "./formats/#{type?.toLowerCase()}"
    new Format confij
  catch err
    throw new Error "Cannot load format #{type} - #{err}\n#{err.stack}"

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