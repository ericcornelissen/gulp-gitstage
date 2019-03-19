const process = require("child_process");
const gulp = require("gulp");
const path = require("path");

const { each, reduce, stdin, stdout } = require("./utils.js");

const command = require("../src/keywords.js");
const gitstage = require("../src/index.js");

const files = path.join(__dirname, "./fixtures/*.txt");

test("returns a stream", () => {
  const subject = gitstage();
  expect(subject).toHaveProperty("on");
  expect(subject).toHaveProperty("write");
});

describe("successful execution", () => {
  test("stage at least one file on git", done => {
    gulp
      .src(files)
      .pipe(gitstage())
      .pipe(reduce())
      .pipe(
        each(() => {
          expect(process.execFile).toHaveBeenCalled();
          done();
        }),
      );
  });

  test("tries to stage all files in the stream", done => {
    let filesCount = 0;

    gulp
      .src(files)
      .pipe(each(() => filesCount++))
      .pipe(gitstage())
      .pipe(reduce())
      .pipe(
        each(() => {
          expect(process.execFile).toHaveBeenCalledTimes(filesCount);
          done();
        }),
      );
  });

  test("stage all files in the stream", done => {
    let fileList = [];

    gulp
      .src(files)
      .pipe(each(file => fileList.push(file.path)))
      .pipe(gitstage())
      .pipe(reduce())
      .pipe(
        each(() => {
          for (let file of fileList) {
            expect(process.execFile).toHaveBeenCalledWith(
              expect.anything(),
              [command.add, file],
              expect.anything(),
              expect.anything(),
            );
          }

          done();
        }),
      );
  });
});

describe("unsuccessful execution", () => {
  const error = new Error(
    "Command failed: git add [file]\nfatal: pathspec [file] did not match any file",
  );
  error.killed = false;
  error.code = 128;
  error.signal = null;
  error.cmd = "git add [file]";

  beforeEach(() => {
    process.execFile.mockImplementation((file, args, options, callback) => {
      // The behaviour of this mock is based on:
      // https://nodejs.org/api/child_process.html
      callback(error, stdin, stdout);
    });
  });

  test("emits an error if the file could not be added", done => {
    gulp
      .src(files)
      .pipe(gitstage())
      .on("error", () => {
        done();
      });
  });

  afterEach(() => {
    process.execFile.mockRestore();
  });
});

describe("Configuration", () => {
  test("the 'gitCwd' option is used", done => {
    let customCwd = "../foo";
    gulp
      .src(files)
      .pipe(
        gitstage({
          gitCwd: customCwd,
        }),
      )
      .pipe(reduce())
      .pipe(
        each(() => {
          expect(process.execFile).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({
              cwd: customCwd,
            }),
            expect.anything(),
          );

          done();
        }),
      );
  });

  test("the 'gitCwd' option must be a string", () => {
    const subject = gitstage({ gitCwd: ["not", "a", "string"] });
    expect(subject).toHaveProperty("write");
    expect(subject.write).toThrow();
  });

  test("the 'stagedOnly' option is used when true", done => {
    gulp
      .src(files)
      .pipe(
        gitstage({
          stagedOnly: true,
        }),
      )
      .pipe(reduce())
      .pipe(
        each(() => {
          expect(process.execFile).toHaveBeenCalledWith(
            expect.anything(),
            expect.arrayContaining([command.update]),
            expect.anything(),
            expect.anything(),
          );

          done();
        }),
      );
  });

  test("the 'stagedOnly' option is not used when false", done => {
    gulp
      .src(files)
      .pipe(
        gitstage({
          stagedOnly: false,
        }),
      )
      .pipe(reduce())
      .pipe(
        each(() => {
          try {
            expect(process.execFile).toHaveBeenCalledWith(
              expect.anything(),
              expect.not.arrayContaining([command.update]),
              expect.anything(),
              expect.anything(),
            );
          } catch (e) {
            console.log(e);
          }

          done();
        }),
      );
  });

  test("the 'stagedOnly' option is not used by default", done => {
    gulp
      .src(files)
      .pipe(gitstage())
      .pipe(reduce())
      .pipe(
        each(() => {
          try {
            expect(process.execFile).toHaveBeenCalledWith(
              expect.anything(),
              expect.not.arrayContaining([command.update]),
              expect.anything(),
              expect.anything(),
            );
          } catch (e) {
            console.log(e);
          }

          done();
        }),
      );
  });
});
