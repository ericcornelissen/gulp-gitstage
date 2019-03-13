const gulp = require("gulp");
const path = require("path");
const which = require("which");

const { reduce, verify } = require("./utils.js");

const gitstage = require("../src/index.js");
const git = require("../src/git.js");

let files = path.join(__dirname, "./fixtures/*.txt");

test("returns a stream", () => {
  const result = gitstage();
  expect(result).toHaveProperty("on");
  expect(result).toHaveProperty("write");
});

test("stages a file on git", done => {
  const spy = jest.spyOn(git, "stage");

  gulp
    .src(files)
    .pipe(gitstage())
    .pipe(reduce())
    .pipe(
      verify(done, () => {
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      }),
    );
});
