const log = require("gulplog");
const map = require("map-stream");
const PluginError = require("plugin-error");

const git = require("./git.js");
const { errorTag } = require("./constants.js");

module.exports = function(config = {}) {
  const streamId = Math.random();

  log.debug("creating stream [id=%f]: %O", streamId, config);
  return map((_file, callback) => {
    const file = _file.path;

    if (!git.available) {
      let error = new PluginError(errorTag, "git not found on your system.");
      return callback(error);
    }

    if (config.gitCwd !== undefined && typeof config.gitCwd !== "string") {
      let error = new PluginError(errorTag, "'gitCwd' must be a string.");
      return callback(error);
    }

    log.debug("staging '%s'", file);
    git.stage(file, config, streamId, error => {
      if (error) {
        log.debug("stage failed on '%s' | %O", file, error);

        let errorMessage = error.message.split(/\n/)[1];
        let [code, message] = errorMessage.split(/:\s/);

        error = new PluginError(
          errorTag,
          `git add failed: ${message} (${code}).`,
        );

        callback(error);
      } else {
        log.debug("staged '%s'", file);
        callback(0, file);
      }
    });
  });
};
