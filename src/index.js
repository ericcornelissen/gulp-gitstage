const map = require("map-stream");
const PluginError = require("plugin-error");

const git = require("./git.js");
const { errorTag, types } = require("./constants.js");

module.exports = function(config = {}) {
  const streamId = Math.random();

  return map((file, callback) => {
    if (!git.available) {
      const error = new PluginError(errorTag, "git not found on your system.");
      return callback(error);
    }

    if (config.gitCwd && typeof config.gitCwd !== types.string) {
      const error = new PluginError(errorTag, "'gitCwd' must be a string.");
      return callback(error);
    }

    git.stage(file.path, config, streamId, error => {
      if (error) {
        const errorMessage = error.message.split(/\n/)[1];
        const [code, message] = errorMessage.split(/:\s/);

        error = new PluginError(
          errorTag,
          `git add failed: ${message} (${code}).`,
        );

        return callback(error);
      }

      callback(0, file);
    });
  });
};
