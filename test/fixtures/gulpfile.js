const gulp = require("gulp");
const gitstage = require("../../src/index.js");

gulp.task("default", function() {
  return gulp
    .src(["../../LICENSE", "../../README.md"])
    .pipe(gitstage({ gitCwd: "../.." }));
});
