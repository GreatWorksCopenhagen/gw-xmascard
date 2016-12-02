'use strict';

var gulp = require('gulp'),
assemble = require('assemble'),
extname = require('gulp-extname'),
replace = require('gulp-replace'),
path = require('path'),
glob = require('glob'),
helperFiles = glob.sync(paths.assemble+'/helpers/*.js'),
helpers = helperFiles.reduce(function (acc, fp) {
    return extend(acc, require(path.resolve(fp)));
}, {}),
inject = require('gulp-inject');

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

// HTML livereload.
gulp.task('html', function() {
  // options
  assemble.helpers(helpers);
  assemble.partials([paths.src+'/**/*.hbs']);
  assemble.layouts([paths.assemble+'/layouts/*.hbs']);
  assemble.data([paths.assemble+'/data/**/*.json']);
  // Generic build of all pages.
  assemble.src(paths.assemble+'/pages/*.hbs', {layout: 'default'})
    .pipe(extname())
    .pipe(assemble.dest('./src/pages/'))
    .pipe(replace('dir="ltr"', 'dir="rtl"'))
    .pipe(gulp.dest(global.paths.src+'/pages-rtl/'));

// // make pages overview in index
//     gulp.src(paths.src + '/index.html')
//       .pipe(inject(
//         gulp.src(['./src/pages/*.html'], { read: false }), {
//           transform: function (filepath) {
//
//             var filePathSplit = filepath.split("/");
//             // remove "src" from filename;
//             var filePathRelative = filepath.replace('/src/', '');
//             // make pretty filename
//             var filename = filePathSplit[filePathSplit.length-1];
//             if (filepath.slice(-5) === '.html') {
//               return '<li><a href="' + filePathRelative + '" class="arrow-right">' + filename + '</a></li>';
//             }
//             // Use the default transform as fallback:
//             return inject.transform.apply(inject.transform, arguments);
//           }
//         }
//       ))
//       .pipe(gulp.dest('./src'));
});
