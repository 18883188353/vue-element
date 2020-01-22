const path = require('path');

exports.assetsPath = function (_path) {
    return path.posix.join('static', _path);
}

exports.resolve = function (_path) {
    return path.resolve(__dirname, '..', _path);
}