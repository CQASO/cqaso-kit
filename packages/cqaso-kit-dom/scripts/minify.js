const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const destPath = path.resolve('dist');


if (isDirectory(destPath)) {
    const dir = fs.readdirSync(destPath);
    const inputFiles = dir.map((file) => minify(file));
}

function minify(file) {
    const inputFiles = path.join(destPath, file);
    const code = UglifyJS.minify(inputFiles).code;
    fs.writeFileSync(path.join(destPath, path.basename(file, '.js') + '.min' + path.extname(file)), code);
}

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}
