var Path = require('path')
  , test = require('tap').test;

var index = require('../lib/');

var TEST_DATA = {
        arrayIndent: [
            'Foo'
          , 'Bar'
        ]
      , arrayUndent: [
            'Foo'
          , 'Bar'
        ]
      , arrayMultiDimensional: [
            [
                'Foo'
              , 'Bar'
            ]
          , [
                'Fu'
              , 'Baz'
            ]
        ]
      , booleans: [
            true
          , false
        ]
      , floatCanonical: 1.23015e+3
      , floatExponential: 12.3015e+02
      , floatFixed: 1230.15
      , integerCanonical: 12345
      , integerString: '12345'
      , isNull: null
      , objectIndent: {
            prop1: 'Foo'
          , prop2: 'Bar'
        }
      , objectUndent: {
            prop1: 'Foo'
          , prop2: 'Bar'
        }
      , orderedMap: [
            {
              prop: 'Foo'
            }
          , {
              prop: 'Bar'
            }
        ]
      , stringDoubleQuoted: 'Hello, world!\t\u263A'
    }
  , TEST_BUFFER = function() {/*

{
  "arrayIndent": [
    "Foo",
    "Bar"
  ],
  "arrayUndent": [
    "Foo",
    "Bar"
  ],
  "arrayMultiDimensional": [
    [
      "Foo",
      "Bar"
    ],
    [
      "Fu",
      "Baz"
    ]
  ],
  "booleans": [
    true,
    false
  ],
  "floatCanonical": 1230.15,
  "floatExponential": 1230.15,
  "floatFixed": 1230.15,
  "integerCanonical": 12345,
  "integerString": "12345",
  "isNull": null,
  "objectIndent": {
    "prop1": "Foo",
    "prop2": "Bar"
  },
  "objectUndent": {
    "prop1": "Foo",
    "prop2": "Bar"
  },
  "orderedMap": [
    {
      "prop": "Foo"
    },
    {
      "prop": "Bar"
    }
  ],
  "stringDoubleQuoted": "Hello, world!\t☺"
}

    */}.toString().replace(/\r/g, '').split(/\n/).slice(2, -2).join('\n')
  , TEST_FILE = Path.join(__dirname, 'fixtures', 'json.json');

test('load from file', function(t) {
  index.get({json: TEST_FILE}, 'fs').load(function(err, data) {
    t.notOk(err, 'should not have an error');
    t.type(data, 'object', 'data model should be an object');
    t.deepEqual(data, TEST_DATA, 'data models should be equal');
    t.end();
  });
});

test('save to string', function(t) {
  index.get({json: ''}).save(TEST_DATA, function(err, buffer) {
    t.notOk(err, 'should not have an error');
    t.type(buffer, 'string', 'buffer should be a string');
    t.equal(buffer, TEST_BUFFER, 'buffers should be equal');
    t.end();
  });
});