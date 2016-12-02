'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var bulkSass = require('gulp-sass-bulk-import');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  sourceComments: 'map',
  includePaths: [global.paths.src]
}

// Compile SASS with sourcemaps + livereload.
gulp.task('sass', function() {
  gulp.src(global.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(bulkSass())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer("last 2 version", "> 1%", "ie 9"))
    .pipe(concat(global.filenames.distCss))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.css));
});
