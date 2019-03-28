const map = require("map-stream");
const PluginError = require("plugin-error");

const { errorTag } = require("./constants.js");
const git = require("./git.js");

/**
 * Exposes the plugin 'gitstage' to be used in {@link https://gulpjs.com/ Gulp}.
 * The plugin will {@link https://git-scm.com/docs/git-add stage} all files in
 * the stream (unless configured otherwse) to a {@link https://git-scm.com/ git}
 * repository.
 *
 * @exports gulp-gitstage
 * @param  {String} [gitCwd=cwd] Override from which directory git is executed.
 * @param  {Boolean} [stagedOnly=false] Only stage previously staged files.
 * @return {Stream}          Identity file stream, does not modify the input.
 * @example
 * // simple usage
 * gulp.src(...).pipe(gitstage());
 * @example
 * // run prettier and readd staged files
 * gulp.src(...)
 *     .pipe(prettier())
 *     .pipe(gitstage({stagedOnly: true}));
 */
module.exports = function(config = {}) {
  const streamId = Math.random();

  return map((file, callback) => {
    if (!git.available) {
      let error = new PluginError(errorTag, "git not found on your system.");
      return callback(error);
    }

    if (config.gitCwd !== undefined && typeof config.gitCwd !== "string") {
      let error = new PluginError(errorTag, "'gitCwd' must be a string.");
      return callback(error);
    }

    git.stage(file.path, config, streamId, error => {
      if (error) {
        let errorMessage = error.message.split(/\n/)[1];
        let [code, message] = errorMessage.split(/:\s/);

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
