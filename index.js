'use strict';

var applySourceMap = require('vinyl-sourcemaps-apply');
var convert = require('convert-source-map');
var es3safe = require('es3-safe-recast');
var esprima = require('esprima');
var gutil = require('gulp-util');
var recast = require('recast');
var through = require('through2');

module.exports = function(options) {
  return through.obj(function(file, encoding, cb) {
    encoding = encoding || 'utf8';
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-dereserve', 'Streaming not supported'));
    }

    try {
      transform(file, encoding);
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-dereserve', err));
    }

    cb();
  });
};

function transform(file, encoding) {
  var source = file.contents.toString(encoding);
  var opt = {
    esprima: esprima
  };

  if (!es3safe.TEST_REGEX.test(source)) {
    return;
  }

  var inMap = file.sourceMap;
  if (inMap) {
    opt.sourceFileName = file.relative;
    opt.sourceMapName = file.relative;
  }

  var ast = recast.parse(source, opt);
  new es3safe.Visitor().visit(ast);
  var result = recast.print(ast, opt);
  file.contents = new Buffer(result.code);

  if (inMap) {
    // var outMap = convert.fromJSON(result.map.toString());
    applySourceMap(file, result.map);
  }
}
