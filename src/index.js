const map = require("map-stream");
const git = require("./git");

module.exports = function(config = {}) {
  return map((file, callback) => {
    if (!git.available) {
      return callback(new Error("git not found on your system."));
    }

    if (config.gitCwd !== undefined && typeof config.gitCwd !== "string") {
      return callback(new Error("the 'gitCwd' option must be a string."));
    }

    git.stage(file.path, config, error => {
      if (error) {
        return callback(new Error("git add failed."));
      }

      callback(0, file);
    });
  });
};
