# [gulp](http://gulpjs.com)-dereserve [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Dependency Status][deps-image]][deps-url]

> gulp plugin to replace ES3 reserved keyword indentifiers

IE8 cannot parse ES3 reserved keyword like `catch`.
This plugin converts `foo.catch()` to `foo["catch"]()` using [es3-safe-recast](https://www.npmjs.org/package/es3-safe-recast).

## Install

```sh
$ npm install --save-dev gulp-dereserve
```


## Usage

```js
var gulp = require('gulp');
var dereserve = require('gulp-dereserve');

gulp.task('default', function () {
	return gulp.src('src/file.js')
		.pipe(dereserve())
		.pipe(gulp.dest('dist'));
});
```

### Source map

This plugin supports for generating and merging source map.
Use [gulp-sourcemaps](https://www.npmjs.org/package/gulp-sourcemaps).

```sh
$ npm install --save-dev gulp-sourcemaps
```

```js
var gulp = require('gulp');
var dereserve = require('gulp-dereserve');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
	return gulp.src('src/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('build.js'))
		.pipe(dereserve())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});
```

## API

### dereserve(options)

#### options

No options.


## License

MIT License [teppeis](https://github.com/teppeis)

[npm-image]: https://img.shields.io/npm/v/gulp-dereserve.svg
[npm-url]: https://npmjs.org/package/gulp-dereserve
[travis-image]: https://travis-ci.org/teppeis/gulp-dereserve.svg?branch=master
[travis-url]: https://travis-ci.org/teppeis/gulp-dereverse
[deps-image]: https://david-dm.org/teppeis/gulp-dereserve.svg
[deps-url]: https://david-dm.org/teppeis/gulp-dereserve
