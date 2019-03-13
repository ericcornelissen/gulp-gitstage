const path = require('path');

const git = require('../lib/git.js');

let files = path.join(__dirname, './fixtures/*.txt');

test('can be used to check if git is available', () => {
  expect(git).toHaveProperty('checkAvailable');
  expect(git.checkAvailable).toBeInstanceOf(Function);
});

test('can be used to execute the \'git add\' command', () => {
  expect(git).toHaveProperty('stage');
  expect(git.stage).toBeInstanceOf(Function);
});
