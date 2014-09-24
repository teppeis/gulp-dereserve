# [gulp](http://gulpjs.com)-dereserve [![Build Status](https://travis-ci.org/teppeis/gulp-dereserve.svg?branch=master)](https://travis-ci.org/teppeis/gulp-dereserve)

> Lorem ipsum


## Install

```sh
$ npm install --save-dev gulp-dereserve
```


## Usage

```js
var gulp = require('gulp');
var dereserve = require('gulp-dereserve');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(dereserve())
		.pipe(gulp.dest('dist'));
});
```


## API

### dereserve(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT [teppeis](https://github.com/teppeis)
