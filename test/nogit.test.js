const gitstage = require("../src/index.js");
const Git = require("../src/git.js");

beforeAll(() => {
  // Clear the PATH so git definitely cannot be found
  process.env.PATH = "";
});

test("The plugin's stream throws when written to", () => {
  const subject = gitstage();
  expect(subject).toHaveProperty("write");
  expect(subject.write).toThrow();
});

test("The 'stage' function throws if git is not available", () => {
  const git = new Git();
  expect(git.stage).toThrow();
});
