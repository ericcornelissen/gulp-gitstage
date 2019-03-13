const which = require('which');

const gitCmd = 'git';

const resolved = which.sync(gitCmd, { nothrow: true });
if (!resolved) {
  throw new Error('git must be available before tests can be run.');
}
