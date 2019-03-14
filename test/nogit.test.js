const git = require("../src/git.js");

describe("git not in PATH", () => {
  beforeAll(() => {
    // Clear the PATH so git cannot be found
    process.env.PATH = "";
  });

  test("the 'available' property is false", () => {
    expect(git.available).toBeFalsy();
  });

  test("the 'stage' function throws if git is not available", () => {
    expect(git.stage).toThrow();
  });
});
