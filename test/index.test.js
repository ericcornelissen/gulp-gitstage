const process = require("child_process");
const gulp = require("gulp");
const path = require("path");
const which = require("which");

const { each, reduce } = require("./utils.js");

const command = require("../src/keywords.js");
const gitstage = require("../src/index.js");

const files = path.join(__dirname, "./fixtures/*.txt");
const stdin = "stdin";
const stdout = "stdout";

jest.mock("child_process");

test("returns a stream", () => {
  const subject = gitstage();
  expect(subject).toHaveProperty("on");
  expect(subject).toHaveProperty("write");
});

describe("successful execution", () => {
  beforeEach(() => {
    process.execFile.mockImplementation((file, args, options, callback) => {
      // The behaviour of this mock is based on:
      // https://nodejs.org/api/child_process.html
      callback(null, stdin, stdout);
    });
  });

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

  afterEach(() => {
    process.execFile.mockRestore();
  });
});
