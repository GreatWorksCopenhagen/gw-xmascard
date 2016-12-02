'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create(),
	path = require("path"),
	url = require("url"),
	fs = require("fs");

// The default file if the file/path is not found
var defaultFile = "/pages/index.html"
	// I had to resolve to the previous folder, because this task lives inside a ./tasks folder
	// If that's not your case, just use `__dirname`
var folder = path.resolve(__dirname, "./src/");
// var folder = "/";
// console.log(folder);
// Start local dev server.
gulp.task('connect', function() {
	browserSync.init({
		server: {
			baseDir: "./src/",
			middleware: function(req, res, next) {
				var fileName = url.parse(req.url);
                // console.log('----------');
                // console.log(fileName);
				fileName = fileName.href.split(fileName.search).join("");
                // console.log(folder);
                // console.log(fileName);
				var fileExists = fs.existsSync('./src/' + fileName);
				if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    var file = defaultFile;
                    // console.log(defaultFile);
					req.url =  defaultFile;
				}
				return next();
			}
		}
	});
});
