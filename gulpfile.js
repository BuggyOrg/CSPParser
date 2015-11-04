var gulp = require('gulp')
var babel = require('gulp-babel')
var peg = require('gulp-peg')
var gutil = require('gulp-util')

gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'))
})

gulp.task('grammar', function () {
  return gulp.src('src/grammar.peg')
    .pipe(peg().on('error', gutil.log))
    .pipe(gulp.dest('lib'))
})

gulp.task('default', ['babel', 'grammar'])
