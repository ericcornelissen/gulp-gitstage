const Bottleneck = require("bottleneck");
const exec = require("child_process").execFile;
const which = require("which");

const git = "git";
const add = "add";
const update = "-u";

const defaultOptions = { env: process.env };
const limiter = new Bottleneck({ maxConcurrent: 1 });

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
 * @param  {Function} callback Function called on completion.
 */
function gitExecute(args, _options, callback) {
  let options = Object.assign(defaultOptions, _options);
  return limiter.submit(exec, git, args, options, callback);
}

/* === EXPORT === */

const _export = {};

let _available = null;
Object.defineProperty(_export, "available", {
  get: function() {
    if (_available === null) {
      let result = which.sync(git, { nothrow: true });
      _available = !(result === null);
    }

    return _available;
  },
});

/**
 * @param  {String}   file     The path to the file to stage.
 * @param  {Object}   config   Configuration of the stage action.
 *                      - stagedOnly: only stage previously staged files.
 * @param  {Function} callback The function to call on completion.
 */
_export.stage = function(file, config, callback) {
  const args = [add];
  if (config.stagedOnly) args.push(update);
  args.push(file);

  return gitExecute(args, {}, callback);
};

module.exports = _export;
