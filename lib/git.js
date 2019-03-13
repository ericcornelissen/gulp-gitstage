const Bottleneck = require('bottleneck');
const exec = require('child_process').execFile;
const which = require('which');

const git = 'git';

let limiter = new Bottleneck({ maxConcurrent: 1 });

module.exports = {
  exec: function(args, options, callback) {
    return limiter.submit(exec, git, args, options, callback);
  },

  which: function(callback) {
    return which(git, callback);
  },
};
