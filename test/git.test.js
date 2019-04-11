const process = require("child_process");
const path = require("path");

const { stdin, stdout } = require("./utils.js");

const command = require("../src/constants.js");
const git = require("../src/git.js");

const file = path.join(__dirname, "./fixtures/a.txt");

test("Can be used to execute the 'git add' command", () => {
  expect(git).toHaveProperty("stage");
  expect(git.stage).toBeInstanceOf(Function);
});

describe("git.stage - git succeeds", () => {
  test("Calls execFile", done => {
    git.stage(file, {}, 0.0, () => {
      expect(process.execFile).toHaveBeenCalled();
      done();
    });
  });

  test("Attempts to execute git", done => {
    git.stage(file, {}, 0.314, () => {
      expect(process.execFile).toHaveBeenCalledWith(
        command.git,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );

      done();
    });
  });

  test("Attempts to add the file", done => {
    git.stage(file, {}, 0.7, () => {
      expect(process.execFile).toHaveBeenCalledWith(
        expect.anything(),
        [command.add, file],
        expect.anything(),
        expect.anything(),
      );

      done();
    });
  });

  test("Provides an object as options", done => {
    git.stage(file, {}, 0.42, () => {
      expect(process.execFile).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.any(Object),
        expect.anything(),
      );

      done();
    });
  });

  test("Provides a callback function", done => {
    git.stage(file, {}, 0.22, () => {
      expect(process.execFile).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.any(Function),
      );

      done();
    });
  });

  test("The first parameter of the callback", done => {
    git.stage(file, {}, 0.161803, a => {
      expect(a).toBeNull();
      done();
    });
  });

  test("The second parameter of the callback", done => {
    git.stage(file, {}, 0.9001, (a, b) => {
      expect(b).toBe(stdin);
      done();
    });
  });

  test("The third parameter of the callback", done => {
    git.stage(file, {}, 0.167, (a, b, c) => {
      expect(c).toBe(stdout);
      done();
    });
  });

  test("Gives an error if file is not a string", done => {
    git.stage(() => true, {}, 0.2718, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  test("Throws an error if callback is not a function", () => {
    expect(() => git.stage("", {}, 42, false)).toThrowError(TypeError);
  });

  test("Does not attempt to execute git if file is not a string", done => {
    git.stage(() => true, {}, 0.1337, error => {
      expect(process.execFile).not.toHaveBeenCalled();
      done();
    });
  });
});

describe("git.stage - git errors", () => {
  const error = new Error("execution failed.");

  beforeEach(() => {
    // Mock `execFile` such that it fails, the behaviour is based on:
    // https://nodejs.org/api/child_process.html
    process.execFile.mockImplementation((file, args, options, callback) => {
      callback(error, stdin, stdout);
    });
  });

  test("The first parameter of the callback", done => {
    git.stage(file, {}, 0.80085, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  afterEach(() => {
    process.execFile.mockRestore();
  });
});
