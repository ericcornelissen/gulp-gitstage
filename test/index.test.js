const gulp = require('gulp');
const path = require('path');
const which = require('which');

const { reduce, verify } = require('./utils.js');

const gitstage = require('../index.js');
const git = require('../lib/git.js');

let files = path.join(__dirname, './fixtures/*.txt');

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
