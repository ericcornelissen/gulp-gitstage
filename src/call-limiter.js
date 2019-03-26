/**
 * The call limiter module can be used to create schedulers that
 * limit the number of parallel functions running at any time.
 *
 * ## API
 * - new: instantiate a new call limiter.
 */
module.exports = {
  /**
   * Create a new call limiter. A call limiter can be used to
   * schedule calls to any function to a maximum concurrency.
   *
   * ## Example
   * ```
   * const limiter = new({concurrency: 1});
   * new.schedule(fn, arg1, arg2, ..., argN, callback);
   * ```
   *
   * ## Return object API
   *  - schedule: schedule a new funtion to be run by the scheduler.
   *
   * @param  {Number} concurrency The maximum number of calls running in
   *                                parellel.
   * @return {Object}             An object according to the Return object API.
   */
  new: function({ concurrency }) {
    const Bottleneck = require("bottleneck");
    const limiter = new Bottleneck({ maxConcurrent: concurrency });

    return {
      /**
       * Schedule a new function to be called by the scheduler.
       *
       * @param  {Function} fn       The function to be called.
       * @param  {...Any}   args     The arguments to call the function with.
       * @param  {Function} callback The function to call when `fn` finished.
       */
      schedule: function(fn, ...args) {
        limiter.submit.call(limiter, fn, ...args);
      },
    };
  },
};
