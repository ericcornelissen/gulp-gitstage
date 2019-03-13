# gulp-gitstage

> plugin for [gulp](https://github.com/gulpjs/gulp) to stage files with git

## Usage

A plugin for Gulp to stage an object stream of git status files on git.

First, install `gulp-gitstage` as a development dependency:

```shell
npm install --save-dev gulp-gitstage
```

Then, add it to your `gulpfile.js`:

```javascript
const gitstage = require("gulp-gitstage");

const files = gulp.src("./src/*.ext").pipe(gitstage());

files.on("data", function(file) {
  console.log("Staged file:", file);
});
```

## API

### gitstage()

Currently there is no configuration for `gulp-gitstage`.

#### Examples

```javascript
// Stage all files
gulp.src("./**/*").pipe(gitmodified("added"));
```

```javascript
// Stage previously staged files in case they changed
const gitmodified = require("gulp-gitmodified");
gulp
  .src("./**/*")
  .pipe(gitmodified("modified"))
  .pipe(/* edit the file */)
  .pipe(gitmodified("A"));
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
