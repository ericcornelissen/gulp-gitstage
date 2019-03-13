const Bottleneck = require('bottleneck');
const exec = require('child_process').execFile;
const which = require('which');

const git = 'git';

const limiter = new Bottleneck({ maxConcurrent: 1 });

module.exports = {
  checkAvailable: function() {
    let result = which.sync(git, { nothrow: true });
    return !(result === null);
  },

  exec: function(args, options, callback) {
    return limiter.submit(exec, git, args, options, callback);
  },
};
