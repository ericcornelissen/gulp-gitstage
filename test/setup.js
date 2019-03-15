const process = require("child_process");
const which = require("which");

const { stdin, stdout } = require("./utils.js");

const command = require("../src/keywords.js");

/* Verify git is available */
const resolved = which.sync(command.git, { nothrow: true });
if (!resolved) {
  throw new Error("git must be available before tests can be run.");
}

/* Mock child_process */
jest.mock("child_process");

beforeEach(() => {
  process.execFile.mockImplementation((file, args, options, callback) => {
    // The behaviour of this mock is based on:
    // https://nodejs.org/api/child_process.html
    callback(null, stdin, stdout);
  });
});

afterEach(() => {
  process.execFile.mockRestore();
});
