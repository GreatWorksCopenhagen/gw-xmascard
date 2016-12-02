'use strict';

// Export name is the name of the helper
// The file is named helper-<helper name>.js
module.exports.imagePath = function (path, size ) {
  if(path && size){
    var ext = path.substr((~-path.lastIndexOf(".") >>> 0) + 1);
    var name = path.substr(0, path.lastIndexOf('.')) || path;
    var delimiter = "-";
    var filename = name+delimiter+size+ext;
    return filename;
  } else{
    return "check path and size";
  }
};
