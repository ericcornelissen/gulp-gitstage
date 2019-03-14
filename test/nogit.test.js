const git = require("../src/git.js");

beforeAll(() => {
  process.env.PATH = "";
});

test("returns false if git is not available", () => {
  expect(git.available).toBeFalsy();
});
