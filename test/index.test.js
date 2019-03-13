const gulp = require('gulp');
const path = require('path');
const map = require('map-stream');
const which = require('which');

const gitstage = require('../index.js');
const git = require('../lib/git.js');

function reduce() {
  let started = false;
  return map(function(file, callback) {
    if (!started) {
      callback(null, file);
    } else {
      callback();
    }
  });
}
function verify(done, check) {
  if (typeof check !== 'function') {
    throw new Error('expects a function');
  }

  return map(function(file, callback) {
    check();
    done();
  });
}

let files = path.join(__dirname, './fixtures/*.txt');
let gitCmd = 'git';

beforeAll(done => {
  which(gitCmd, error => {
    if (error) {
      throw new Error('git must be available before tests can be ran');
    }

    done();
  })
});

test('returns a stream', () => {
  const result = gitstage();
  expect(result).toHaveProperty('on');
  expect(result).toHaveProperty('write');
});

test('checks if git is available', done => {
  const spy = jest.spyOn(git, 'which');

  gulp.src(files)
      .pipe(gitstage())
      .pipe(reduce())
      .pipe(verify(done, () => {
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      }));
});

test('executes a git command', done => {
  const spy = jest.spyOn(git, 'exec');

  gulp.src(files)
      .pipe(gitstage())
      .pipe(reduce())
      .pipe(verify(done, () => {
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      }));
});
