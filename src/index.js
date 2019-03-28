const map = require("map-stream");
const path = require("path");
const PluginError = require("plugin-error");

const git = require("./git.js");
const { errorTag, types } = require("./constants.js");

module.exports = function(config = {}) {
  const streamId = Math.random();

  return map((_file, callback) => {
    const gitRoot = path.resolve(_file.cwd, config.gitCwd || "");
    const file = path.relative(gitRoot, _file.path);

    if (config.gitCwd && typeof config.gitCwd !== types.string) {
      const error = new PluginError(errorTag, "'gitCwd' must be a string.");
      return callback(error);
    }

    git.stage(file, config, streamId, error => {
      if (error) {
        const errorMessage = error.message.split(/\n/)[1];
        const [code, message] = errorMessage.split(/:\s/);

        error = new PluginError(
          errorTag,
          `git add failed: ${message} (${code}).`,
        );

        callback(error);
      } else {
        callback(0, file);
      }
    });
  });
};
