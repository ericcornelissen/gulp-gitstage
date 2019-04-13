const debounce = require("../src/utils/debounce.js");

test("Does not throw an error", () => {
  expect(() => debounce(jest.fn(), 1)).not.toThrow();
});

test("Requires a function to call", () => {
  expect(() => debounce()).toThrow();
  expect(() => debounce("not a function")).toThrow();
});

test("Requires a timeout value", () => {
  let fn = jest.fn();
  expect(() => debounce(fn)).toThrow();
  expect(() => debounce(fn, "not a number")).toThrow();
});

describe("Debouncing", () => {
  const timeout = 50;

  let fn, debouncedFn;
  beforeEach(() => {
    // Prepare a spied function and debounced version of that function to be
    // used in the test suite.
    fn = jest.fn();
    debouncedFn = debounce(fn, timeout);
  });

  test("Executes the function only once", () => {
    debouncedFn();
    debouncedFn();

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    }, timeout);
  });

  test("Executes the last call to the function", () => {
    const message = "Hello world!";

    debouncedFn("foo");
    debouncedFn("bar");
    debouncedFn(message);

    setTimeout(() => {
      expect(fn).toHaveBeenCalledWith(message);
    }, timeout);
  });

  test("Executes the function again after the specified timeout", () => {
    const message = "Hello world!";

    debouncedFn();
    setTimeout(debouncedFn, timeout * 2);

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    }, timeout * 3);
  });

  test("Executes the function only once after the specified timeout", () => {
    const message = "Hello world!";

    debouncedFn();
    debouncedFn();
    setTimeout(() => {
      debouncedFn();
      debouncedFn();
    }, timeout * 2);

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    }, timeout * 3);
  });
});
