const process = require("child_process");
const path = require("path");

const { stdin, stdout } = require("./utils.js");

const Git = require("../src/git.js");
const command = require("../src/utils/constants.js");
const log = require("../src/utils/log.js");

const file = path.join(__dirname, "./fixtures/a.txt");

let git;
beforeEach(() => {
  git = new Git();
});

test("Can be used to execute the 'git add' command", () => {
  expect(git).toHaveProperty("stage");
  expect(git.stage).toBeInstanceOf(Function);
});

describe("git.stage - git succeeds", () => {
  test("Calls execFile", done => {
    git.stage(file, {}, () => {
      expect(process.execFile).toHaveBeenCalled();
      done();
    });
  });

  test("Attempts to execute git", done => {
    git.stage(file, {}, () => {
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
    git.stage(file, {}, () => {
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
    git.stage(file, {}, () => {
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
    git.stage(file, {}, () => {
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
    git.stage(file, {}, a => {
      expect(a).toBeNull();
      done();
    });
  });

  test("The second parameter of the callback", done => {
    git.stage(file, {}, (a, b) => {
      expect(b).toBe(stdin);
      done();
    });
  });

  test("The third parameter of the callback", done => {
    git.stage(file, {}, (a, b, c) => {
      expect(c).toBe(stdout);
      done();
    });
  });

  test("Gives an error if file is not a string", done => {
    git.stage(() => true, {}, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  test("Throws an error if callback is not a function", () => {
    expect(() => git.stage("", {}, false)).toThrowError(TypeError);
  });

  test("Does not attempt to execute git if file is not a string", done => {
    git.stage(() => true, {}, error => {
      expect(process.execFile).not.toHaveBeenCalled();
      done();
    });
  });

  test("Logs the command it will execute", done => {
    git.stage(() => true, {}, error => {
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
    git.stage(file, {}, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  afterEach(() => {
    process.execFile.mockRestore();
  });
});
