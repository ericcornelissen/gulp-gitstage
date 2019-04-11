const { types } = require("./constants.js");

/**
 * Provides a function to debounce calls to a specific function.
 * @module debounce
 * @param  {Function} fn - the function to debounce.
 * @param  {Number} timeout - the time to wait before executing {@link fn}.
 * @return {Function} The debounced function.
 * @example
 * const debouncedLog = debounce(console.log);
 * debouncedLog("foo");
 * debouncedLog("bar");
 * // -> "bar"
 */
module.exports = function(fn, timeout) {
  const debounce = require("debounce");

  if (typeof fn !== types.function) {
    throw new TypeError("fn is not a function");
  } else if (typeof timeout !== types.number) {
    throw new TypeError("timeout is not a number");
  } else {
    return debounce(fn, timeout, false);
  }
};
