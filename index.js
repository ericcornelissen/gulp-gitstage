const map = require('map-stream');
const git = require('./lib/git');

const defaultOptions = { env: process.env };

module.exports = function() {
  return map(function(file, callback) {
    let available = git.checkAvailable();
    if (!available) {
      return callback(new Error('git not found on your system.'));
    }

    git.stage(file.path, defaultOptions, error => {
      if (error) {
        return callback(new Error('git add failed.'));
      }

      callback(0, file);
    });
  });
};
