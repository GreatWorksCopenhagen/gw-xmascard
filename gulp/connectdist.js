'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Start local dev server.
gulp.task('connectdist', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});
