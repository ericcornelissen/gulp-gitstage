# gulp-gitstage

[![NPM version][npm-image]][npm-url]
[![Build status][travisci-image]][travisci-url]
[![Coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![License][license-image]][license-url]
[![Prettier][prettier-image]][prettier-url]

> plugin for [gulp](https://github.com/gulpjs/gulp) to stage files with git

## Usage

A plugin for Gulp to stage an object stream of files on git.

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

### `gitstage(options)`

This plugin takes a single object as configuration. The available options are
listed below. Note that all options are optional.

| option       | type    | description                                    | default |
| ------------ | ------- | ---------------------------------------------- | ------- |
| `gitCwd`     | String  | Override from which directory git is executed. | `"./"`  |
| `stagedOnly` | Boolean | Only stage previously staged files.            | `false` |

#### Examples

```javascript
const gitstage = require("gulp-gitstage");

// Stage all files in the pipe
gulp.src("./**/*").pipe(gitstage());
```

```javascript
const gitstage = require("gulp-gitstage");

// Stage files only if they're already staged
gulp.src("./**/*").pipe(gitstage({ stagedOnly: true }));
```

## Help

<details>
<summary>Contributing to the project</summary>
Read more in the <a href="\CONTRIBUTING.md">Contributing Guidelines</a> and <a href="\CODE_OF_CONDUCT.md">Code of Conduct</a>.
</details>

<details>
<summary>Known errors & solutions</summary>

<b>git not found on your system.</b>

<p>The <code>git</code> command was not found in your environment variables. <a href="https://stackoverflow.com/a/26620861">Read more here</a>.</p>

<b>'gitCwd' must be a string.</b>

<p>The `gitCwd` option, as listed <a href="#gitstageoptions">above</a>, must be a string.</p>

<b>pathspec 'path/to/file' did not match any files</b>

<p>You are trying to add a file that does not exist in your project. Perhaps you're using <a href="https://www.npmjs.com/package/gulp-rename">gulp-rename</a> before staging?</p>

<b>Unable to create '.../.git/index.lock': File exists.</b>

<p>The plugin is trying to run multiple instances of `git add` simultaneously. If you get this error <a href="https://github.com/ericcornelissen/gulp-gitstage/issues/new?template=bug.md">report it immediately</a>.</p>
</details>

[npm-url]: https://npmjs.org/package/gulp-gitstage
[npm-image]: https://badge.fury.io/js/gulp-gitstage.png
[travisci-url]: http://travis-ci.com/ericcornelissen/gulp-gitstage
[travisci-image]: https://travis-ci.com/ericcornelissen/gulp-gitstage.svg?branch=master
[codecov-url]: https://codecov.io/gh/ericcornelissen/gulp-gitstage
[codecov-image]: https://codecov.io/gh/ericcornelissen/gulp-gitstage/branch/master/graph/badge.svg
[snyk-url]: https://snyk.io/test/github/ericcornelissen/gulp-gitstage?targetFile=package.json
[snyk-image]: https://snyk.io/test/github/ericcornelissen/gulp-gitstage/badge.svg?targetFile=package.json
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[prettier-url]: https://prettier.io/
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
