const callLimiter = require("./call-limiter.js");
const { add, git, types, update } = require("./constants.js");

const BUFFER_DELAY = 150;
const DEFAULT_OPTIONS = { env: process.env };
const STAGE_BUFFERS = {};

const limiter = callLimiter.new({ concurrency: 1 });

/**
 * Execute arbitrary git commands one at the time. When
 * multiple calls are performed in quick succession the
 * git commands are automatically rate limited.
 *
 * Example:
 * ```
 * gitExecute(['add', 'myfile.txt'], options, callback);
 * // -> executes: $ git add myfile.txt
 * ```
 *
 * @param  {Array}    args     The arguments for the command in order.
 * @param  {Object}   _options Options for the command.
 *                      - gitCwd: directory containing the '.git' folder.
 * @param  {Function} callback Function called on completion.
 */
function gitExecute(args, _options, callback) {
  const exec = require("child_process").execFile;

  if (!isGitAvailable()) {
    throw new Error("git not found on your system.");
  }

  const options = Object.assign(DEFAULT_OPTIONS, {
    cwd: _options.gitCwd,
  });

  return limiter.schedule(exec, git, args, options, callback);
}

/**
 * Get a buffer for a particular stream (based on the
 * id) to which additional files can be pushed such
 * that in the end only a single `git add` command is
 * executed.
 *
 * @param {Any} id        A unique identifier for a stream.
 * @return {StageBuffer}  The buffer that can be used to add files.
 */
function getStageBufferForStream(id) {
  const debounce = require("debounce");

  if (STAGE_BUFFERS[id] === undefined) {
    const callbacks = [];
    const files = [];

    const db = debounce(function(config) {
      STAGE_BUFFERS[id] = undefined;

      const args = [add];
      if (config.stagedOnly) args.push(update);
      Array.prototype.push.apply(args, files);

      gitExecute(args, config, (error, stdin, stdout) => {
        for (const callback of callbacks) {
          callback(error, stdin, stdout);
        }
      });
    }, BUFFER_DELAY);

    STAGE_BUFFERS[id] = {
      push: function(file, config, callback) {
        callbacks.push(callback);
        files.push(file);
        db(config);
      },
    };
  }

  return STAGE_BUFFERS[id];
}

let _available = null;
function isGitAvailable() {
  if (_available === null) {
    const which = require("which");

    const result = which.sync(git, { nothrow: true });
    _available = !(result === null);
  }

  return _available;
}

module.exports = {
  /**
   * @param  {String}   file     The path to the file to stage.
   * @param  {Object}   config   Configuration of the stage action.
   *                      - gitCwd: directory containing the '.git' folder.
   *                      - stagedOnly: only stage previously staged files.
   * @param  {Any}      streamId A unique identifier for a stream.
   * @param  {Function} callback The function to call on completion.
   * @throws {TypeError}         Callback is not a function.
   * @throws {Error}             The git command is not present.
   */
  stage: function(file, config, streamId, callback) {
    if (typeof file !== types.string) {
      callback("file must be a string.");
    } else if (typeof callback !== types.function) {
      throw new TypeError("callback is not a function");
    } else {
      const stageBuffer = getStageBufferForStream(streamId);
      stageBuffer.push(file, config, callback);
    }
  },
};
