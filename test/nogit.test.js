const gulp = require("gulp");
const path = require("path");

const gitstage = require("../src/index.js");
const git = require("../src/git.js");

let files = path.join(__dirname, "./fixtures/*.txt");

beforeAll(() => {
  // Clear the PATH so git cannot be found
  process.env.PATH = "";
});

test("the plugin throws", () => {
  const stream = gitstage();
  expect(stream.write).toThrow();
});

test("the 'available' property is false", () => {
  expect(git.available).toBeFalsy();
});

test("the 'stage' function throws if git is not available", () => {
  expect(git.stage).toThrow();
});
