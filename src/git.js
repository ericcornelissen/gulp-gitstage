const Bottleneck = require("bottleneck");
const exec = require("child_process").execFile;
const which = require("which");

const git = "git";
const add = "add";

const limiter = new Bottleneck({ maxConcurrent: 1 });

function gitExecute(args, options, callback) {
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

_export.stage = function(file, options, callback) {
  if (!_export.available) {
    throw new Error("missing git");
  }

  return gitExecute([add, file], options, callback);
};

module.exports = _export;
