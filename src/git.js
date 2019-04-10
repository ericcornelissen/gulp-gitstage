const callLimiter = require("./call-limiter.js");
const { add, git, types, update } = require("./constants.js");

const BUFFER_DELAY = 150;
const DEFAULT_OPTIONS = { env: process.env };
const STAGE_BUFFERS = {};

const limiter = callLimiter.new({ concurrency: 1 });

let _available = null;

/**
 * Execute arbitrary git commands one at the time. When multiple calls are
 * made in quick succession the commands are automatically rate limited.
 *
 * @private
 * @param  {Array} args - The arguments for the command in order.
 * @param  {String} gitCwd - Relative path to the root of the git repository.
 * @param  {Function} callback - Function called on completion.
 * @example
 * const options = {gitCwd: "../"}
 * gitExecute(['add', 'myfile.txt'], options, callback);
 * // -> executes: $ git add myfile.txt
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
 * Get a buffer for a particular stream (based on the id) to which files can be
 * pushed such that in the end only a single `git add` command is executed.
 *
 * @private
 * @param {Any} id - A unique identifier for a stream.
 * @return {StageBuffer} The buffer that can be used to add files.
 * @example
 * const stageBuffer = getStageBufferForStream(42);
 * stageBuffer.push(file, config, callback)
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

/**
 * Check whether or not git is available on the system.
 *
 * @private
 * @return {Boolean} True if git is available on the system, false otherwise.
 */
function isGitAvailable() {
  if (_available === null) {
    const which = require("which");

    const result = which.sync(git, { nothrow: true });
    _available = !(result === null);
  }

  return _available;
}

/**
 * Provides a class with an API to interact with git.
 * @module git
 * @example
 * const Git = require('path/to/git.js');
 * const git = new Git();
 */
module.exports = function() {
  const id = Math.random();

  /**
   * Stage a file in a git repository.
   *
   * @param  {String} file - Path to the file to stage.
   * @param  {String} gitCwd - Relative path to the root of the git repository.
   * @param  {Boolean} stagedOnly - Only stage previously staged files.
   * @param  {Function} callback - The function to call on completion.
   * @throws {TypeError} Callback is not a function.
   * @throws {Error} The git command is not present.
   * @example
   * const config = {gitCwd: "../", stagedOnly: false};
   * stage('my-file.js', config, error => {
   *  if (error) {
   *    console.log('Failed.');
   *  } else {
   *    console.log('Success!');
   *  }
   * });
   */
  this.stage = function(file, config, callback) {
    if (typeof file !== types.string) {
      callback("file must be a string.");
    } else if (typeof callback !== types.function) {
      throw new TypeError("callback is not a function");
    } else {
      const stageBuffer = getStageBufferForStream(id);
      stageBuffer.push(file, config, callback);
    }
  };
};
