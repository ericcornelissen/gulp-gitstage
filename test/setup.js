const process = require("child_process");

const { stdin, stdout } = require("./utils.js");

jest.mock("child_process");
jest.mock("../src/log.js");

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
