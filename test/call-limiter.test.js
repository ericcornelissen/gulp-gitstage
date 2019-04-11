const callLimiter = require("../src/call-limiter.js");

const noop = () => {};
const SLOW_TIMEOUT = 250;

let instantSpy, slowSpy;

beforeEach(() => {
  // Create spies that can be used to test the scheduling
  // of functions offered by the API
  const getCallback = args => args[args.length - 1];

  instantSpy = jest.fn(function() {
    const callback = getCallback(arguments);
    callback();
  });
  slowSpy = jest.fn(function() {
    const callback = getCallback(arguments);
    setTimeout(callback, SLOW_TIMEOUT);
  });
});

test("Has a 'new' property that can be used to create a new limiter", () => {
  expect(callLimiter).toHaveProperty("new");
  expect(callLimiter.new).toBeInstanceOf(Function);
});

test("A limiter instance has a 'schedule' property", () => {
  const limiter = callLimiter.new({ concurrency: 1 });

  expect(limiter).toHaveProperty("schedule");
  expect(limiter.schedule).toBeInstanceOf(Function);
});

describe("Call limiting", () => {
  const HALF_TIMEOUT = Math.floor(SLOW_TIMEOUT / 2) - 1;

  test("Runs the functions in order", done => {
    const limiter = callLimiter.new({ concurrency: 1 });

    limiter.schedule(instantSpy, () => {
      expect(instantSpy).toHaveBeenCalledTimes(1);
    });
    limiter.schedule(instantSpy, () => {
      expect(instantSpy).toHaveBeenCalledTimes(2);
    });
    limiter.schedule(instantSpy, () => {
      expect(instantSpy).toHaveBeenCalledTimes(3);
      done();
    });
  });

  test("Limits to one call at the time", done => {
    const limiter = callLimiter.new({ concurrency: 1 });

    let counter = 0;
    const interval = setInterval(() => counter++, HALF_TIMEOUT);

    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(instantSpy, () => {
      clearInterval(interval);
      expect(counter).toEqual(4);
      done();
    });
  });

  test("Limits to three calls at the time", done => {
    const limiter = callLimiter.new({ concurrency: 3 });

    let counter = 0;
    const interval = setInterval(() => counter++, HALF_TIMEOUT);

    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);
    limiter.schedule(slowSpy, noop);

    limiter.schedule(instantSpy, () => {
      clearInterval(interval);
      expect(counter).toEqual(6);
      done();
    });
  });
});

describe("Argument passing", () => {
  const arg1 = "foobar";
  const arg2 = 42;
  const arg3 = "The cake is a lie";
  const arg4 = 43252003274489856000;

  let limiter;

  beforeEach(() => {
    // Instantiate a limiter to be used in this test suite
    limiter = callLimiter.new({ concurrency: 1 });
  });

  test("Passes 0 arguments to the function", done => {
    limiter.schedule(instantSpy, () => {
      expect(instantSpy).toHaveBeenCalledWith(expect.any(Function));

      done();
    });
  });

  test("Passes 1 argument to the function", done => {
    limiter.schedule(instantSpy, arg1, () => {
      expect(instantSpy).toHaveBeenCalledWith(arg1, expect.any(Function));

      done();
    });
  });

  test("Passes 2 arguments to the function", done => {
    limiter.schedule(instantSpy, arg1, arg2, () => {
      expect(instantSpy).toHaveBeenCalledWith(arg1, arg2, expect.any(Function));

      done();
    });
  });

  test("Passes 3 arguments to the function", done => {
    limiter.schedule(instantSpy, arg1, arg2, arg3, () => {
      expect(instantSpy).toHaveBeenCalledWith(
        arg1,
        arg2,
        arg3,
        expect.any(Function),
      );

      done();
    });
  });

  test("Passes 4 arguments to the function", done => {
    limiter.schedule(instantSpy, arg1, arg2, arg3, arg4, () => {
      expect(instantSpy).toHaveBeenCalledWith(
        arg1,
        arg2,
        arg3,
        arg4,
        expect.any(Function),
      );

      done();
    });
  });
});
