'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var compiler = require('es3-safe-recast');

module.exports = function(options) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-dereserve', 'Streaming not supported'));
    }

    try {
      file.contents = new Buffer(compiler.compile(file.contents.toString(), options));
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-dereserve', err));
    }

    cb();
  });
};
