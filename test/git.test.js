const process = require("child_process");
const path = require("path");

const { stdin, stdout } = require("./utils.js");

const command = require("../src/constants.js");
const git = require("../src/git.js");
const log = require("../src/log.js");

const file = path.join(__dirname, "./fixtures/a.txt");

test("can be used to execute the 'git add' command", () => {
  expect(git).toHaveProperty("stage");
  expect(git.stage).toBeInstanceOf(Function);
});

describe("successful execution", () => {
  test("calls execFile", done => {
    git.stage(file, {}, 0.0, () => {
      expect(process.execFile).toHaveBeenCalled();
      done();
    });
  });

  test("attempts to execute git", done => {
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

  test("attempts to add the file", done => {
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

  test("provides an object as options", done => {
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

  test("attempts to execute git", done => {
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

  test("the first parameter of the callback", done => {
    git.stage(file, {}, 0.161803, a => {
      expect(a).toBeNull();
      done();
    });
  });

  test("the second parameter of the callback", done => {
    git.stage(file, {}, 0.9001, (a, b) => {
      expect(b).toBe(stdin);
      done();
    });
  });

  test("the third parameter of the callback", done => {
    git.stage(file, {}, 0.167, (a, b, c) => {
      expect(c).toBe(stdout);
      done();
    });
  });

  test("gives an error if file is not a string", done => {
    git.stage(() => true, {}, 0.2718, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  test("throws an error if callback is not a function", () => {
    expect(() => git.stage("", {}, 42, false)).toThrowError(TypeError);
  });

  test("does not attempt to execute git if file is not a string", done => {
    git.stage(() => true, {}, 0.1337, error => {
      expect(process.execFile).not.toHaveBeenCalled();
      done();
    });
  });

  test("logs the command it will execute", done => {
    git.stage(() => true, {}, 0.36, error => {
      expect(log.debug).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(Object),
      );
      done();
    });
  });
});

describe("unsuccessful execution", () => {
  const error = new Error("execution failed.");

  beforeEach(() => {
    process.execFile.mockImplementation((file, args, options, callback) => {
      // The behaviour of this mock is based on:
      // https://nodejs.org/api/child_process.html
      callback(error, stdin, stdout);
    });
  });

  test("the first parameter of the callback", done => {
    git.stage(file, {}, 0.80085, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  afterEach(() => {
    process.execFile.mockRestore();
  });
});
