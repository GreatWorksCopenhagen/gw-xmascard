'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var exec = require('child_process').execSync;
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSeq = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var bulkSass = require('gulp-sass-bulk-import');

// One build task to rule them all.
gulp.task('build', function (done) {
  runSeq('clean', ['html','buildhtml', 'buildsass', 'buildjs'], 'copyassets', 'buildimg', done);
});

// Build SASS for distribution.
gulp.task('buildsass', function () {
  var sassOptions = {
    errLogToConsole: true,
    includePaths: [global.paths.src]
  };
  gulp.src(global.paths.sass)
    .pipe(bulkSass())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat(global.filenames.distCss))
    //.pipe(autoprefixer())
    .pipe(minifyCss())
  	//.pipe(rename({
  	//	suffix: '.min'
  	//}))
    .pipe(gulp.dest(global.paths.dist+'/css/'));
});

// Build JS for distribution.
gulp.task('buildjs', function () {
  exec('npm run buildjs', function (err, stdout, stderr) {
    if (err) {
      throw err;
    }
    else {
      console.log('Build complete!');
    }
  });
});

// Build HTML for distribution.
gulp.task('buildhtml', function () {
  // left to right;
  console.log(global.paths.htmldist);
  gulp.src(global.paths.htmldist)
    .pipe(replace('<script src="/lib/system.js"></script>', ''))

    .pipe(replace('/config.js', global.filenames.distJs))
    .pipe(replace("<script>System.import('/js/main')</script>", ''))
    .pipe(gulp.dest(global.paths.dist));

  // right to left;
    // gulp.src(global.paths.htmlrtldist)
    // .pipe(replace('../lib/system.js', ''))
    // .pipe(replace('../config.js', global.filenames.distJs))
    // .pipe(replace("<script>System.import('../js/main')</script>", ''))
    // .pipe(gulp.dest(global.paths.dist+'/pages-rtl/'));
});

// Build images for distribution.
gulp.task('buildimg', function () {
  gulp.src(global.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.assets + '/img'));
});

// Copy assets to distfolder
gulp.task('copyassets', function () {
  // copy js vendors
  gulp.src('./src/js/vendors/**/**.*')
    .pipe(gulp.dest(global.paths.dist+'/js/vendors/'));
  // copy icons fonts
  gulp.src('./src/icons/dist/**/**.*')
    .pipe(gulp.dest(global.paths.dist+'/icons/dist/'));
  //gulp.src('./src/lib/**/**.*')
  //  .pipe(gulp.dest(global.paths.dist+'/lib/'));
  //gulp.src('./src/modules/**/**.*')
  //  .pipe(gulp.dest(global.paths.dist+'/modules/'));
  gulp.src(global.paths.assets+'/**/**.*')
    .pipe(gulp.dest(global.paths.dist+'/assets/'));

  // gulp.src('./src/index.html')
  //   .pipe(gulp.dest(global.paths.dist+'/'));
});
