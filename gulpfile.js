'use strict';

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

var baseUrl = './src';
// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': [baseUrl+'/assemble/**/*.hbs', './src/modules/**/*.hbs'],
  // HTML sources.
  'htmldist': baseUrl+'/pages/**/*.html',
  'htmlrtldist': baseUrl+'/pages-rtl/**/*.html',
  //pages
  'pages': baseUrl+'/pages',
  // assembledir
  'assemble': baseUrl+'/assemble',
  // JS sources.
  'js': [baseUrl+'/js/**/*.js',baseUrl+'/modules/**/*.js'],
  // SASS sources.
  'sass': [baseUrl+'/scss/**/*.scss',baseUrl+'/modules/**/*.scss'],
  // Image sources.
  'img': baseUrl+'/assets/img/**.*',
  // Assets sources.
  'assets': baseUrl+'/assets',
  // Sources folder.
  'src': baseUrl,
  // Compiled CSS folder.
  'css': baseUrl+'/css',
  // basefolder for icons
  'icons':baseUrl+'/icons',
  // Distribution folder.
  'dist': './dist',
  // ModuleTemplate
  'moduleTemplate' : './gulp',
  // Modules folder.
  'modules': baseUrl+'/modules'
};
global.filenames = {
  'distCss': '../css/main.css',
  'distJs': '../js/main.js'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['html', 'sass', 'connect', 'watch']);

// Default task; start local server & watch for changes.
gulp.task('servedist', ['connectdist']);
