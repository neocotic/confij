var Path = require('path')
  , test = require('tap').test;

var index = require('../lib/');

var TEST_DATA = {
        string: 'Hello, world!\\t\\u263A'
      , 'string with spaces': 'Hello, world!'
      , flag: true
      , object1: {
            prop1: 'Foo'
          , prop2: 'Bar'
          , nested: {
                prop1: 'Fu'
              , prop2: 'Baz'
            }
        }
      , object2: {
          string: '12345'
        }
      , object3: {
          nested: {
            deep: {
                prop1: 'Foo'
              , prop2: 'Bar'
            }
          }
        }
    }
  , TEST_BUFFER = function() {/*

string = Hello, world!\t\u263A
string with spaces = Hello, world!
flag = true

[object1]
prop1 = Foo
prop2 = Bar

[object1.nested]
prop1 = Fu
prop2 = Baz

[object2]
string = 12345

[object3.nested.deep]
prop1 = Foo
prop2 = Bar


    */}.toString().replace(/\r/g, '').split(/\n/).slice(2, -2).join('\n')
  , TEST_FILE = Path.join(__dirname, 'fixtures', 'ini.ini');

test('load from file', function(t) {
  index.get({ini: TEST_FILE}, 'fs').load(function(err, data) {
    t.notOk(err, 'should not have an error');
    t.type(data, 'object', 'data model should be an object');
    t.deepEqual(data, TEST_DATA, 'data models should be equal');
    t.end();
  });
});

test('save to string', function(t) {
  index.get({ini: ''}).save(TEST_DATA, function(err, buffer) {
    t.notOk(err, 'should not have an error');
    t.type(buffer, 'string', 'buffer should be a string');
    t.equal(buffer, TEST_BUFFER, 'buffers should be equal');
    t.end();
  });
});