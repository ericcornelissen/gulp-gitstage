# Contributing to gulp-gitstage

gulp-gitstage welcomes any contributions and corrections by anyone (see our
[Code of Conduct](/CODE_OF_CONDUCT.md)), for example:

- Adding functionality
- Fixing bugs
- Improving documentation
- Removing typos

This document will help you get started making changes to the project, as well
as provide you with valuable information on how the repository works.

## Table of contents

- [Getting started](#getting-started)
- [Making a contribution](#making-a-contribution)
- [Project details](#project-details)

---

## Getting started

- [Prerequisites](#prerequisites)
- [Setting up](#setting-up)

### Prerequisites

In order to contribute to this project you need to have the following software
on your system.

- [git]
- [node] (including `npm`)

### Setting up

1. <details><summary>Fork this repository</summary>
   Because you don't have rights to push your changes to this repository you need to create a fork first. <a href="https://guides.github.com/activities/forking/#fork">Read more...</a>
   </details>

2. <details><summary>Clone the repository locally</summary>
   We recommend cloning the repository with SSH. However, you can also use HTTPS, in which case you need the following URL: <code>https://github.com/[YOUR USERNAME]/gulp-gitstage.git</code>. <a href="https://help.github.com/en/articles/which-remote-url-should-i-use">Read more...</a>
   </details>

```shell
$ git clone git@github.com:[YOUR USERNAME]/gulp-gitstage.git
```

3. <details><summary>Install the dependencies</summary>
   This project depends on other packages, for example to run tests. Therefor you have to install the dependencies through NPM in order to make a contribution. On top of that running this command also sets up some git hooks.
   </details>

```shell
$ npm install
```

4. <details><summary>Check if everything works</summary>
   If this command errors, something went wrong while setting up the project. If you cannot figure out why setting up doesn't work (make sure you looked for existing issues) feel free to open a new issue.
   </details>

```shell
$ npm run example
```

---

## Making a contribution

If you want to contribute to this project in any way, shape, or form follow the
following steps. Make sure to review the [project details](#project-details)
to get to know some specifics about contributing to this project.

1. Set up a local copy of the project, as [described above](#setting-up)
1. Create a new branch from the latest `master` (read more [here](https://guides.github.com/introduction/flow/))
1. Start hacking on the new branch
1. Commit and push to the new branch
1. Make a pull request (read more [here](https://guides.github.com/activities/forking/#making-a-pull-request))

---

## Project details

- [Commit messages](#commit-messages)
- [Project scripts](#project-scripts)

### Commit messages

Commits for this project follow the [Conventional Commit] format. Although
contributions not following this convention are generally still accepted, it is
encouraged to try to follow the convention to the best of your ability.

[husky] is used to enforce the format locally. If your commit does not follow
the convention you may see something like this:

```shell
$ git commit -m "this is not a valid commit message"
i   input: this is not a valid commit message
x   subject may not be empty [subject-empty]
x   type may not be empty [type-empty]
x   found 2 problems, 0 warnings
```

If needed you can bypass the check by adding `--no-verify` to the command:

```shell
$ git commit -m "this is not a valid commit message" --no-verify
```

### Project scripts

In the table below you find all the scripts available for this project with a
description of what they do. You can execute these scripts locally using:

```shell
$ npm run [name]

# for example
$ npm run test:coverage
```

| name            | description                                                    |
| --------------- | -------------------------------------------------------------- |
| `clean`         | Remove generated files from your local copy of the repository. |
| `debug:version` | Obtain version information for debugging purposes.             |
| `docs:build`    | Build documentation from the in-code documentation.            |
| `example`       | Run the package using an example `gulpfile.js`.                |
| `lint`          | Lint the repository using [Prettier].                          |
| `prettier`      | Run [Prettier] on all (relevant) files in the repository.      |
| `test`          | Run all test suites for the package.                           |
| `test:coverage` | Run al test suites and generate a coverage report.             |

[git]: https://git-scm.com/downloads
[husky]: https://github.com/typicode/husky
[jsdoc]: http://usejsdoc.org/
[node]: https://nodejs.org/en/download/
[prettier]: https://prettier.io/
[conventional commit]: https://www.conventionalcommits.org/en/v1.0.0-beta.3/#summary
