'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var dereserve = require('../');

describe('dereserve', function() {
  it('should convert reserved keyword.', function(cb) {
  var stream = dereserve();

  stream.on('data', function(file) {
      assert.equal(file.relative, 'file.js');
      assert.equal(file.contents.toString(), 'a["catch"]()');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
      base: __dirname,
      path: __dirname + '/file.js',
      contents: new Buffer('a.catch()')
  }));

  stream.end();
  });

  it('should generate source map.', function(cb) {
  var stream = dereserve();
  stream.on('data', function(file) {
      assert.equal(file.relative, 'file.js');
      assert.equal(file.contents.toString(), 'a["catch"]()');
      assert.deepEqual(file.sourceMap, {
      version: 3,
      sources: ['file.js'],
      names: [],
      mappings: 'AAAA,UAAO,CAAC',
      file: 'file.js',
      sourcesContent: ['a.catch()']
      });
  });

  stream.on('end', cb);

  var file = new gutil.File({
      base: __dirname,
      path: __dirname + '/file.js',
      contents: new Buffer('a.catch()')
  });
  var inMap = {
      version : 3,
      file: file.relative,
      names: [],
      mappings: '',
      sources: [file.relative],
      sourcesContent: [file.contents.toString()]
  };
  file.sourceMap = inMap;

  stream.write(file);

  stream.end();
  });
});
