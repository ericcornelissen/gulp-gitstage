module.exports = {
  coverageDirectory: "./_reports/coverage",
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 100,
      lines: 95,
    },
  },
  collectCoverageFrom: ["./src/**/*.js"],

  setupFilesAfterEnv: ["./test/setup.js"],
};
