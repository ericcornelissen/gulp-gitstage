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
  return debounce(fn, timeout, false);
};
