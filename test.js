'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var dereserve = require('./');

it('should ', function(cb) {
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
