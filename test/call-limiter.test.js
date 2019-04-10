const callLimiter = require("../src/call-limiter.js");

const noop = () => {};
const SLOW_TIMEOUT = 250;

let instantSpy, slowSpy;

beforeEach(() => {
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

test("new property", () => {
  expect(callLimiter).toHaveProperty("new");
  expect(callLimiter.new).toBeInstanceOf(Function);
});

describe("limiter instance", () => {
  test("schedule property", () => {
    const limiter = callLimiter.new({ concurrency: 1 });

    expect(limiter).toHaveProperty("schedule");
    expect(limiter.schedule).toBeInstanceOf(Function);
  });
});

describe("call limiting", () => {
  const HALF_TIMEOUT = Math.floor(SLOW_TIMEOUT / 2) - 1;

  test("runs the functions in order", done => {
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

  test("limit to one call at the time", done => {
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

  test("limit to three calls at the time", done => {
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

describe("argument passing", () => {
  const arg1 = "foobar";
  const arg2 = 42;
  const arg3 = "The cake is a lie";
  const arg4 = 43252003274489856000;

  let limiter;

  beforeEach(() => {
    limiter = callLimiter.new({ concurrency: 1 });
  });

  test("0 arguments", done => {
    limiter.schedule(instantSpy, () => {
      expect(instantSpy).toHaveBeenCalledWith(expect.any(Function));

      done();
    });
  });

  test("1 argument", done => {
    limiter.schedule(instantSpy, arg1, () => {
      expect(instantSpy).toHaveBeenCalledWith(arg1, expect.any(Function));

      done();
    });
  });

  test("2 arguments", done => {
    limiter.schedule(instantSpy, arg1, arg2, () => {
      expect(instantSpy).toHaveBeenCalledWith(arg1, arg2, expect.any(Function));

      done();
    });
  });

  test("3 arguments", done => {
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

  test("4 arguments", done => {
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
