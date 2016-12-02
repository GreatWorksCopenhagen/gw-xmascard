var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var iconify = require('gulp-iconify');
var util = require('gulp-util');
var rename = require('gulp-rename');
var runTimestamp = Math.round(Date.now() / 1000);


// icons font src
var iconsFontsSrc = paths.icons + '/src/fonts',
  // icons sprites src
  iconsSpritesSrc = paths.icons + '/src/sprites',
  //icons dest
  iconsFontsDist = paths.icons + '/dist/fonts/';

gulp.task('makeicons', function () {
  util.log(
    util.colors.green('Generating Icons')
  );

  iconify({
    src: iconsSpritesSrc + '/*.svg',
    pngOutput: paths.icons + '/dist/png',
    scssOutput: paths.icons + '/dist/scss',
    cssOutput: paths.icons + '/dist/css',
    styleTemplate: paths.icons+'/csstemplates/_sprite-icon-template.mustache',
    //defaultWidth: '512px',
    //defaultHeight: '512px',
    svgoOptions: {
      enabled: true,
      options: {
        plugins: [
          {removeUnknownsAndDefaults: false},
          {mergePaths: false}
        ]
      }
    }
  });



  gulp.src([iconsFontsSrc + '/*.svg'])
    .pipe(iconfontCss({
      fontName: 'icons-font',
      path: paths.icons + '/csstemplates/_icons.scss',
      targetPath: '../scss/_icons-font.scss',
      fontPath: "../icons/dist/fonts/"
    }))
    .pipe(iconfont({
      fontName: 'icons-font', // required
      //appendUnicode: false, // recommended option
      formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp // recommended to get consistent builds when watching files
    }))
    .on('glyphs', function (glyphs, options) {
    // CSS templating, e.g.
      util.log(
        util.colors.green('Done generating icons')
      );
    //console.log(glyphs, options);
    })
    .pipe(gulp.dest(iconsFontsDist));
});
