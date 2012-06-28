# Public: Attempts to get the value of the given `key` from the specified
# `child` within `obj`.
#
# If no value is found here it will fall back on the value from the `obj` where
# possible.
#
# obj   - An Object to be traversed.
# child - Optional: A String name of a nested Object within `obj`.
# key   - Optional: A String key.
#
# Returns the value of the given `key` or parent Object.
module.exports.derive = (obj, child, key) ->
  if @isObject child
    [child, key] = @unmap child

  if key?
    if child?
      obj?[child]?[key] ? obj?[key]
    else
      obj?[key]
  else
    if child? then obj?[child] else obj

# Public: Indicates whether or not `obj` is a Function.
#
# obj - A possible Function.
#
# Returns the Boolean result.
module.exports.isFunction = (obj) ->
  @isType obj, 'function'

# Public: Indicates whether or not `obj` is an Object.
#
# obj - A possible Object.
#
# Returns the Boolean result.
module.exports.isObject = (obj) ->
  @isType obj, 'object'

# Public: Indicates whether or not `obj` is of the given `type`.
#
# obj  - An Object to be tested.
# type - A String data type to be checked.
#
# Returns the Boolean result.
module.exports.isType = (obj, type) ->
  type is typeof obj

# Public: Extracts the first key/value pair found from `obj` into an Array.
#
# obj - An Object to be used.
#
# Returns an Array containing the key and its value, in that order.
module.exports.unmap = (obj) ->
  result = []

  for key, value of obj when value?
    result.push key
    result.push value
    break

  result