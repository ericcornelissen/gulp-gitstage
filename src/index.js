const map = require("map-stream");
const git = require("./git");

module.exports = function(config = {}) {
  return map(function(file, callback) {
    if (!git.available) {
      return callback(new Error("git not found on your system."));
    }

    git.stage(file.path, config, error => {
      if (error) {
        return callback(new Error("git add failed."));
      }

      callback(0, file);
    });
  });
};
