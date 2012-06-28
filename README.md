                            ___               
                          /'___\ __    __     
      ___    ___     ___ /\ \__//\_\  /\_\    
     /'___\ / __`\ /' _ `\ \ ,__\/\ \ \/\ \   
    /\ \__//\ \L\ \/\ \/\ \ \ \_/\ \ \ \ \ \  
    \ \____\ \____/\ \_\ \_\ \_\  \ \_\_\ \ \ 
     \/____/\/___/  \/_/\/_/\/_/   \/_/\ \_\ \
                                      \ \____/
                                       \/___/ 

[confij][] is a configuration tool for [node.js][] which provides a simple
solution to all your configuration needs.

[![Build Status](https://secure.travis-ci.org/neocotic/confij.png)](http://travis-ci.org/neocotic/confij)

## Install

Install from [npm][]:

``` bash
$ npm install confij
```

## Usage

There are various ways of getting a `Confij` instance;

``` javascript
// Tell confij to use a JSON file
confij = require('confij').get('package.json', 'fs')
// Force confij to treat a JSON file as YAML
confij = require('confij').get({yaml: 'config.json'}, 'fs')
// Tell confij to use a web service endpoint that returns JSON
confij = require('confij').get({json: 'https://api.github.com/repos/neocotic/confij'}, 'https')
// Tell confij to use an INI string
confij = require('confij').get({ini: 'foo=bar'})
```

Once you have your `Confij` instance it gets really easy. Loading is as easy as
Pi.

``` javascript
// Load a configuration asynchronously
confij.load(function(err, data) {
  if (err) throw err
  // Use data...
})
// Load a configuration synchronously
data = confij.loadSync()
```

Saving is really simple too, and since the `Confij` instance keeps a reference
to your configuration data object you don't have to pass it back.

``` javascript
confij.save(function(err, buffer) {
  if (err) throw err
  // Use or ignore buffer...
})
// Save a configuration synchronously
buffer = confij.saveSync()
// Overwrite a configuration synchronously
buffer = confij.saveSync({foo: 'bar'})
```

In an adapter or format implementation does not support a method of its
interface then an error will be raised when that method is called to indicate
that operation is not supported.

## Adapters

Confij uses adapters as an interface to a configuration source. For example,
these can allow you to read and write configuration data in files or even a
web service endpoint.

Browse the `src/adapters` directory to get an idea of what adapters are
available as this is where they are loaded from.

I'm currently working on creating a guide and process to help developers
contribute their own adapters.

## Formats

Confij uses formats as an interface to a specific configuration format. For
example, these can allow you to read/write configuration data which has been
serialized using the JSON format.

Browse the `src/formats` directory to get an idea of what formats are available
as this is where they are loaded from.

I'm currently working on creating a guide and process to help developers
contribute their own formats.

## Options

Since no environment is the same, you can specify an additional options when
creating your `Confij` instance which it can then use to meet your
requirements. Adapters and formats get the most use out of options and
is is best practice to group such options as follows;

``` javascript
confij = require('confij').get({json: 'http://api.example.com/config'}, 'http', {
  http: {
    load: {
      method: 'GET'
    },
    save: {
      method: 'POST'
    }
  }
})
// 'GET' request was sent
confij.load()
// 'POST' request was sent
confij.save()
```

Options are retrieved in a rather smart fashion by attempting to get the most
accurate value depending on the method on which they are being used. For
example, when using the `fs` adapter, you can specify what `encoding` should be
used when reading and writing to the file. If for some reason you wanted to
read it as `UTF-8` but write it using `UTF-16`, you could do this;

``` javascript
confij = require('confij').get('package.json', 'fs', {
  fs: {
    encoding: 'ansi',
    load: {
      encoding: 'utf8'
    },
    saveSync: {
      encoding: 'utf16'
    }
  }
})
// UTF-8 was used to read the file
confij.load()
// UTF-8 was used to read the file as it fell back on the value of its asynchronous partner
confij.loadSync()
// ANSI was used to write to file as it fell back on its global value
confij.save()
// UTF-16 was used to write to file
confij.saveSync()
```

You may have also noticed that missing options for synchronous methods fall
back on their asynchronous counterparts, but this is not the case in the
opposite case (e.g. `load` will not fall back on the `loadSync` option).

I've only demonstrated options for adapters but they can also be used by
format's methods (e.g. `parse`, `stringify` and their synchronous
alternatives).

For a list of options available for an adapter or format just open its file in
the `src/adapters` or `src/formats` directories respectively, and read the
header comment.

## Events

An alternative approach to managing your configuration data asynchronously is
to listen for events.

``` javascript
confij = require('confij').get('package.json', 'fs')
confij.on('load', function(err, data) {
  if (err) throw err
  // Use data...
})
// Load the latest configuration every 15 seconds
setInterval(confij.load, 15 * 1000)
```

The following events can be triggered by `Confij`;

<table>
  <tr>
    <th>Name</th>
    <th>Called...</th>
  </tr>
  <tr>
    <td>adapterLoaded</td>
    <td>...once an <code>Adapter</code> instance has been loaded</td>
  </tr>
  <tr>
    <td>error</td>
    <td>...when an error occurs (<code>err</code> argument is passed to handlers)</td>
  </tr>
  <tr>
    <td>formatLoaded</td>
    <td>...once a <code>Format</code> instance has been loaded</td>
  </tr>
  <tr>
    <td>loaded</td>
    <td>...after configuration data has been loaded (<code>data</code> argument passed to handlers)</td>
  </tr>
  <tr>
    <td>parsed</td>
    <td>...after a formatted string has been parsed (<code>obj</code> argument passed to handlers)</td>
  </tr>
  <tr>
    <td>ready</td>
    <td>...once <code>Adapter</code> and <code>Format</code> instances have been loaded</td>
  </tr>
  <tr>
    <td>saved</td>
    <td>...after confiugration data has been saved (<code>buffer</code> argument passed to handlers)</td>
  </tr>
  <tr>
    <td>stringified</td>
    <td>...after an object has been serialized (<code>str</code> argument passed to handlers)</td>
  </tr>
</table>

## Bugs

If you have any problems with this library or would like to see the changes
currently in development you can do so here;

https://github.com/neocotic/confij/issues

## Questions?

Take a look at code documentation to get a better understanding of what it is
doing.

If that doesn't help, feel free to follow me on Twitter, @neocotic.

However, if you want more information or examples of using this library please
visit the project's homepage;

http://neocotic.com/confij

[confij]: http://neocotic.com/confij
[node.js]: http://nodejs.org
[npm]: http://npmjs.org