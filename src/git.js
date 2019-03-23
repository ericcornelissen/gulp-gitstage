const callLimiter = require("./call-limiter.js");
const { add, git, update } = require("./constants.js");

const BUFFER_DELAY = 150;
const stageBuffers = {};
const defaultOptions = { env: process.env };
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

  if (!_export.available) {
    throw new Error("git not found on your system.");
  }

  let options = Object.assign(defaultOptions, {
    cwd: _options.gitCwd || __dirname,
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

  if (stageBuffers[id] === undefined) {
    const callbacks = [];
    const files = [];

    const db = debounce(function(config) {
      stageBuffers[id] = undefined;

      const args = [add];
      if (config.stagedOnly) args.push(update);
      Array.prototype.push.apply(args, files);

      gitExecute(args, config, (error, stdin, stdout) => {
        for (const callback of callbacks) {
          callback(error, stdin, stdout);
        }
      });
    }, BUFFER_DELAY);

    stageBuffers[id] = {
      push: function(file, config, callback) {
        callbacks.push(callback);
        files.push(file);
        db(config);
      },
    };
  }

  return stageBuffers[id];
}

/* === EXPORT === */

const _export = {};

let _available = null;
Object.defineProperty(_export, "available", {
  get: function() {
    if (_available === null) {
      const which = require("which");

      let result = which.sync(git, { nothrow: true });
      _available = !(result === null);
    }

    return _available;
  },
});

/**
 * @param  {String}   file     The path to the file to stage.
 * @param  {Object}   config   Configuration of the stage action.
 *                      - gitCwd: directory containing the '.git' folder.
 *                      - stagedOnly: only stage previously staged files.
 * @param  {Any}      streamId A unique identifier for a stream.
 * @param  {Function} callback The function to call on completion.
 */
_export.stage = function(file, config, streamId, callback) {
  if (typeof file !== "string") {
    callback("file must be a string.");
  } else {
    const buffer = getStageBufferForStream(streamId);
    buffer.push(file, config, callback);
  }
};

module.exports = _export;
