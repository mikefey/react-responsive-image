var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify);
  b.add('./js/src/app.js');
  return b.bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/build'));
});