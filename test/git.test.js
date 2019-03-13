const path = require('path');

const git = require('../lib/git.js');

let files = path.join(__dirname, './fixtures/*.txt');

test('can be used to expect commands', () => {
  expect(git).toHaveProperty('exec');
  expect(git.exec).toBeInstanceOf(Function);
});

test('can be used to check if git is available', () => {
  expect(git).toHaveProperty('which');
  expect(git.which).toBeInstanceOf(Function);
});
