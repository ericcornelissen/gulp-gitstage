const process = require("child_process");
const path = require("path");

const { stdin, stdout } = require("./utils.js");

const command = require("../src/constants.js");
const git = require("../src/git.js");

const file = path.join(__dirname, "./fixtures/a.txt");

test("can be used to check if git is available", () => {
  expect(git).toHaveProperty("available");
  expect(git.available).toBeTruthy();
});

test("can be used to execute the 'git add' command", () => {
  expect(git).toHaveProperty("stage");
  expect(git.stage).toBeInstanceOf(Function);
});

describe("successful execution", () => {
  test("calls execFile", done => {
    git.stage(file, {}, () => {
      expect(process.execFile).toHaveBeenCalled();
      done();
    });
  });

  test("attempts to execute git", done => {
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

  test("attempts to add the file", done => {
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

  test("provides an object as options", done => {
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

  test("attempts to execute git", done => {
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

  test("the first parameter of the callback", done => {
    git.stage(file, {}, a => {
      expect(a).toBeNull();
      done();
    });
  });

  test("the second parameter of the callback", done => {
    git.stage(file, {}, (a, b) => {
      expect(b).toBe(stdin);
      done();
    });
  });

  test("the third parameter of the callback", done => {
    git.stage(file, {}, (a, b, c) => {
      expect(c).toBe(stdout);
      done();
    });
  });

  test("gives an error if file is not a string", done => {
    git.stage(() => true, {}, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  test("does not attempt to execute git if file is not a string", done => {
    git.stage(() => true, {}, error => {
      expect(process.execFile).not.toHaveBeenCalled();
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
    git.stage(file, {}, error => {
      expect(error).not.toBeNull();
      done();
    });
  });

  afterEach(() => {
    process.execFile.mockRestore();
  });
});
