# gulp-gitstage

[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![License][license-image]][license-url]

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

[npm-url]: https://npmjs.org/package/gulp-gitstage
[npm-image]: https://badge.fury.io/js/gulp-gitstage.png

[build-url]: http://travis-ci.org/ericcornelissen/gulp-gitstage
[build-image]: https://travis-ci.com/ericcornelissen/gulp-gitstage.svg?branch=master

[greenkeeper-url]: https://greenkeeper.io/
[greenkeeper-image]: https://badges.greenkeeper.io/ericcornelissen/gulp-gitstage.svg

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
