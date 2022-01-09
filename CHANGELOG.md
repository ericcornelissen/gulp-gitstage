# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog], and this project adheres to [Semantic
Versioning].

## [Unreleased]

- Update dependencies. ([#108], [#122])

## [1.5.2] - 2021-03-19

### Security

- Update vulnerable `shescape` version. ([#96])

## [1.5.1] - 2020-12-22

### Security

- Escape shell arguments. ([#95])

## [1.5.0] - 2020-06-11

### Fixed

- Make the `stagedOnly` flag work as intended. ([#87])

### Security

- Update dependencies. ([#85], [#86])

## [1.4.3] - 2020-04-10

### Security

- Update dependencies. ([#83], [#84])

## [1.4.2] - 2019-11-09

### Security

- Update dependencies. ([#74], [#75])

## [1.4.1] - 2019-04-13

### Changed

- Abstract dependencies behind local modules. ([#56])

### Security

- Update dependencies.

## [1.4.0] - 2019-04-11

### Added

- Debug/verbose logging. ([#48])

### Changed

- Abstract dependencies behind local modules. ([#42])
- Commit files based on relative rather than absolute path. ([#47])

## [1.3.0] - 2019-03-19

Increase performance :racehorse:

### Changed

- Lazy load dependencies. ([#38])
- Files to stage are now buffered to reduce number of calls to `git`. ([#41])

### Fixed

- Improved error messages, powered by `git` itself. ([#36])

## [1.2.0] - 2019-03-16

Add some configuration :wrench:

### Added

- Option to specify a custom working directory for git. ([#29])
- Option to only stage files that were previously staged. ([#30])

## [1.1.0] - 2019-03-14

Cleaned up original version and fixed the first bug :ok_hand:

### Fixed

- Package description in `package.json`.
- Adding multiple files in quick succession caused the plugin to crash. ([#14])
- Check only once if `git` is available on the PATH. ([#17])
- Reduce install size as dependency. ([#12])

### Security

- Audited package dependencies. ([#11])

## [1.0.0] - 2019-03-10

Adapted [gulp-gitmodified](https://github.com/mikaelbr/gulp-gitmodified) to
create a gulp plugin to stage files :tada:

### Added

- Stage files with git in the gulp object stream.
- Examples of how to use the plugin.

[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html
[#11]: https://github.com/ericcornelissen/gulp-gitstage/issues/11
[#12]: https://github.com/ericcornelissen/gulp-gitstage/issues/12
[#14]: https://github.com/ericcornelissen/gulp-gitstage/issues/14
[#17]: https://github.com/ericcornelissen/gulp-gitstage/issues/17
[#29]: https://github.com/ericcornelissen/gulp-gitstage/pull/29
[#30]: https://github.com/ericcornelissen/gulp-gitstage/pull/30
[#36]: https://github.com/ericcornelissen/gulp-gitstage/pull/36
[#38]: https://github.com/ericcornelissen/gulp-gitstage/pull/38
[#41]: https://github.com/ericcornelissen/gulp-gitstage/pull/41
[#42]: https://github.com/ericcornelissen/gulp-gitstage/pull/42
[#47]: https://github.com/ericcornelissen/gulp-gitstage/pull/47
[#48]: https://github.com/ericcornelissen/gulp-gitstage/pull/48
[#46]: https://github.com/ericcornelissen/gulp-gitstage/pull/46
[#56]: https://github.com/ericcornelissen/gulp-gitstage/pull/56
[#74]: https://github.com/ericcornelissen/gulp-gitstage/pull/74
[#75]: https://github.com/ericcornelissen/gulp-gitstage/pull/75
[#83]: https://github.com/ericcornelissen/gulp-gitstage/pull/83
[#84]: https://github.com/ericcornelissen/gulp-gitstage/pull/84
[#85]: https://github.com/ericcornelissen/gulp-gitstage/pull/85
[#86]: https://github.com/ericcornelissen/gulp-gitstage/pull/86
[#87]: https://github.com/ericcornelissen/gulp-gitstage/pull/87
[#95]: https://github.com/ericcornelissen/gulp-gitstage/pull/95
[#96]: https://github.com/ericcornelissen/gulp-gitstage/pull/96
[#108]: https://github.com/ericcornelissen/gulp-gitstage/pull/108
[#122]: https://github.com/ericcornelissen/gulp-gitstage/pull/122
