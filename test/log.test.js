const gulplog = require("gulplog");

const log = require("../src/log.js");

jest.unmock("../src/log.js");
jest.mock("gulplog");

describe("Debug", () => {
  test("Logs a message", () => {
    const message = "Hello world!";

    log.debug(message);
    expect(gulplog.debug).toHaveBeenCalledWith(
      expect.stringContaining(message),
    );
  });

  test("Logs a message formatted with a string", () => {
    const message = "Hello %s!";
    const arg1 = "foobar";

    log.debug(message, arg1);
    expect(gulplog.debug).toHaveBeenCalledWith(
      expect.stringContaining(message),
      arg1,
    );
  });

  test("Logs a message formatted with two arguments", () => {
    const message = "There are not the %s you're looking for: %O";
    const arg1 = "droids";
    const arg2 = ["R2-D2", "C-3PO", "DD-8"];

    log.debug(message, arg1, arg2);
    expect(gulplog.debug).toHaveBeenCalledWith(
      expect.stringContaining(message),
      arg1,
      arg2,
    );
  });
});
