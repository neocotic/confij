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
        // TODO: Not expecting new line at end
      , blockFold: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?\n'
        // TODO: Not expecting new line at end
      , blockPreserve: 'How much wood would\na woodchuck chuck if\na woodchuck could chuck\nwood?\n'
      , booleans: [
            true
          , false
        ]
        // Tue Jun 26 2012 08:47:15 GMT+0100 (GMT Daylight Time)
      , dateCanonical: new Date(1340696835000)
        // Tue Jun 26 2012 08:47:15 GMT+0100 (GMT Daylight Time)
      , dateIso8601: new Date(1340696835000)
        // Tue Jun 26 2012 00:00:00 GMT+0100 (GMT Daylight Time)
      , dateSimple: new Date(1340665200000)
        // Tue Jun 26 2012 08:47:15 GMT+0100 (GMT Daylight Time)
      , dateSpaced: new Date(1340696835000)
      , floatCanonical: 1.23015e+3
      , floatExponential: 12.3015e+02
      , floatFixed: 1230.15
      , infinityNegative: Number.NEGATIVE_INFINITY
      , infinityPositive: Number.POSITIVE_INFINITY
      , integerCanonical: 12345
      , integerDecimal: 12345
      , integerFloat: parseFloat('123')
      , integerHexadecimal: 0xC
      , integerOctal: '0o14' // TODO: Expected: `014`
      , integerString1: '12345'
      , integerString2: '12345'
      , isNull1: null
      , isNull2: null
      , isNull3: null
      , objectIndent: {
            prop1: 'Foo'
          , prop2: 'Bar'
        }
      , objectReference: {
            prop1: 'Foo'
          , prop2: 'Bar'
        }
      , objectSpan: {
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
      , notANumber: NaN
      , set: [
            {
              Foo: null
            }
          , {
              Bar: null
            }
        ]
      , stringDoubleQuoted: 'Hello, world!\t☺'
      , stringSimple: 'Hello, world!'
      , stringSingleQuoted: 'Hello, world!'
      , stringVersion: '1.0.0'
    }
  , TEST_BUFFER = function() {/*

arrayIndent:
  - Foo
  - Bar
arrayUndent:
  - Foo
  - Bar
arrayMultiDimensional:
  -
    - Foo
    - Bar
  -
    - Fu
    - Baz
blockFold:             How much wood would a woodchuck chuck if a woodchuck could chuck wood?
blockPreserve:         |
  How much wood would
  a woodchuck chuck if
  a woodchuck could chuck
  wood?
booleans:
  - true
  - false
dateCanonical:         2012-06-26T08:47:15.1Z
dateIso8601:           2012-06-26t08:47:15.10-00:00
dateSimple:            2012-06-26
dateSpaced:            2012-06-26t08:47:15.10 -0
floatCanonical:        1230.15
floatExponential:      1230.15
floatFixed:            1230.15
infinityNegative:      -Infinity
infinityPositive:      Infinity
integerCanonical:      12345
integerDecimal:        12345
integerFloat:          123
integerHexadecimal:    12
integerOctal:          0o14
integerString1:        12345
integerString2:        12345
isNull1:               ~
isNull2:               ~
isNull3:               ~
objectIndent:
  prop1: Foo
  prop2: Bar
objectReference:
  prop1: Foo
  prop2: Bar
objectSpan:
  prop1: Foo
  prop2: Bar
objectUndent:
  prop1: Foo
  prop2: Bar
orderedMap:
  -
    prop: Foo
  -
    prop: Bar
notANumber:            NaN
set:
  -
    Foo: ~
  -
    Bar: ~
stringDoubleQuoted:    Hello, world!      ☺
stringSimple:          Hello, world!
stringSingleQuoted:    Hello, world!
stringVersion:         1.0.0

    */}.toString().replace(/\r/g, '').split(/\n/).slice(2, -2).join('\n')
  , TEST_FILE = Path.join(__dirname, 'fixtures', 'yaml.yml');

test('load from file', function(t) {
  index.get({yaml: TEST_FILE}, 'fs').load(function(err, data) {
    t.notOk(err, 'should not have an error');
    t.type(data, 'object', 'data model should be an object');
    t.deepEqual(data, TEST_DATA, 'data models should be equal');
    t.end();
  });
});

// TODO: Support test
/*
test('save to string', function(t) {
  index.get({yaml: ''}).save(TEST_DATA, function(err, buffer) {
    t.notOk(err, 'should not have an error');
    t.type(buffer, 'string', 'buffer should be a string');
    t.equal(buffer, TEST_BUFFER, 'buffers should be equal');
    t.end();
  });
});
*/