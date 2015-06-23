'use strict';

var applySourceMap = require('vinyl-sourcemaps-apply');
var es3safe = require('es3-safe-recast');
var gutil = require('gulp-util');
var recast = require('recast');
var through = require('through2');
var BufferStreams = require('bufferstreams');

module.exports = function(options) {
  return through.obj(function(file, encoding, cb) {
    encoding = encoding || 'utf8';
    if (file.isNull()) {
      this.push(file);
    } else if (file.isBuffer()) {
      file.contents = transform(file, file.contents.toString(encoding));
      this.push(file);
    } else if (file.isStream()) {
      file.contents = file.contents.pipe(new BufferStreams(function(err, buf, done) {
        if(err) {
          done(new gutil.PluginError('gulp-dereserve', err, {showStack: true}));
        } else {
          done(null, transform(file, buf.toString(encoding)));
        }
      }));
      this.push(file);
    }
    cb();
  });
};

function transform(file, source) {
  if (!es3safe.TEST_REGEX.test(source)) {
    return new Buffer(source);
  }

  var opt = {};
  var inMap = file.sourceMap;
  if (inMap) {
    opt.sourceFileName = file.relative;
    opt.sourceMapName = file.relative;
  }

  var ast = recast.parse(source, opt);
  es3safe.visit(ast);
  var result = recast.print(ast, opt);

  if (inMap) {
    // var outMap = convert.fromJSON(result.map.toString());
    applySourceMap(file, result.map);
  }

  return new Buffer(result.code);
}
