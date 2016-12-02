'use strict';

var gulp = require('gulp'),
  prompt = require('gulp-prompt'),
  template = require('gulp-template'),
  rename = require("gulp-rename"),
  rimraf = require('gulp-rimraf'),
  pathExists = require('path-exists');

var config = {
  templateName: 'moduleTemplate'
}

// create module
gulp.task('module', function () {
  gulp.src('*')
    .pipe(prompt.prompt({  // make prompt, ask for modulename
      type: 'input',
      name: 'moduleName',
      message: 'Whats the name of your module ?',
      validate: function(moduleName){
        // make sure we have a name
        if(moduleName.length < 1 ){
          return false;
        }
        return true;
      }
    }, function (res) {
      // make sure the module does not exists again
      pathExists(paths.modules+'/'+res.moduleName).then(function (exists) {
        if(exists){
          console.log('Module already exists');
        } else {
          // module is new - create it.
          createModule(res.moduleName);
        }
      });
    }));
});

function toCamelCase(obj) {
  // make string to camelcase if we have "-" or "_" or " "
  return obj.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
}

function createModuleFile(moduleName, ext){
  // create module file from template.
  var templateName = config.templateName,
    scsstemplateName = config.templateName;
  if(ext == 'scss') {
    scsstemplateName = "_" + templateName;
  }
  gulp.src(paths.moduleTemplate+'/'+templateName+'/'+scsstemplateName+'.'+ext)
    .pipe(template({name: moduleName}))
    .pipe(gulp.dest(paths.modules+'/'+moduleName ))
    .on('end', function(){renameModuleFile(moduleName, ext)});
}
function renameModuleFile(moduleName, ext) {
  // created moduleFile to the modulename
  var thisModuleName = moduleName,
    thisExt = ext,
    thisTemplateName = config.templateName,
    filename = thisModuleName;
  // if its a scss-file, prepend "_" to filename
  if(ext == 'scss'){
    thisTemplateName = "_"+thisTemplateName;
    filename = "_"+thisModuleName;
  }
  gulp.src(paths.modules+'/'+moduleName+"/"+thisTemplateName+"."+ext)
    .pipe(rename(paths.modules+'/'+moduleName+"/"+filename+"."+ext))
    .pipe(gulp.dest("."))
    .on('end', function () {
      // when file is renamed, delete moduleTemplate file, since rename doesnt actually rename but copy to another name.
      gulp.src(paths.modules+'/'+thisModuleName+"/"+thisTemplateName+"."+thisExt, {read: false})
        .pipe(rimraf());
    });
}
function createModule(moduleName){
  // make sure name is camelCase.
  var moduleName = toCamelCase(moduleName);
  // make modulefiles.
  createModuleFile(moduleName, 'hbs');
  createModuleFile(moduleName, 'scss');
  createModuleFile(moduleName, 'js');

  console.log("Module: "+ moduleName +" created in: "+paths.modules);
}
