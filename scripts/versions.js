#!/usr/bin/env node

const exec = require("child_process").exec;

const git = "git";
const node = "node";
const gulp = "gulp";

const logResult = cmdName => {
  return (error, stdout, stderr) => {
    if (error) {
      console.error(`${cmdName} not found\n`);
    } else {
      console.log(`${cmdName}: ${stdout}`);
    }
  };
};

exec(`${git} --version`, logResult(git));
exec(`${gulp} --version`, logResult(gulp));
exec(`${node} --version`, logResult(node));
