const gitstage = require("../src/index.js");
const git = require("../src/git.js");

beforeAll(() => {
  // Clear the PATH so git cannot be found
  process.env.PATH = "";
});

test("the plugin throws", () => {
  const subject = gitstage();
  expect(subject).toHaveProperty("write");
  expect(subject.write).toThrow();
});

test("the 'available' property is false", () => {
  expect(git.available).toBeFalsy();
});

test("the 'stage' function throws if git is not available", () => {
  expect(git.stage).toThrow();
});
