const Bottleneck = require('bottleneck');
const exec = require('child_process').execFile;
const which = require('which');

const git = 'git';
const add = 'add';

const limiter = new Bottleneck({ maxConcurrent: 1 });

function gitExecute(args, options, callback) {
  return limiter.submit(exec, git, args, options, callback);
}

module.exports = {
  checkAvailable: function() {
    let result = which.sync(git, { nothrow: true });
    return !(result === null);
  },

  stage: function(file, options, callback) {
    return gitExecute([add, file], options, callback);
  },
};
