var map = require('map-stream');
var git = require('./lib/git');

var gitApp = 'git';
var gitExtra = {env: process.env};

var scssLintPlugin = function() {
  return map(function(file, cb) {
    git.which(gitApp, function(err) {
      if (err) {
        return cb(new Error('git not found on your system.'));
      }

      git.exec(gitApp, ['add', file.path], gitExtra, function(err, stdout) {
        if (err) {
          return cb(new Error('git add failed.'));
        }

        cb(0, file);
      });
    })
  });
};

// Export the plugin main function
module.exports = scssLintPlugin;
