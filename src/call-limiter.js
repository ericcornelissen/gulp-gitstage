/**
 * Provides an API to rate limit calls to any funciton.
 * @module callLimiter
 */
module.exports = {
  /**
   * Create a new call limiter.
   *
   * @param  {Number} concurrency - The maximum number of calls running in parellel.
   * @return {Object} An object with the function schedule.
   * @example
   * const limiter = new({concurrency: 1});
   * limiter.schedule(fn, arg1, arg2, ..., argN, callback);
   */
  new: function({ concurrency }) {
    const Bottleneck = require("bottleneck");
    const limiter = new Bottleneck({ maxConcurrent: concurrency });

    return {
      /**
       * Schedule a new function to be called by the scheduler.
       *
       * @private
       * @param  {Function} fn - The function to be called.
       * @param  {...Any} args - The arguments to call the function with.
       * @param  {Function} callback - The function to call when `fn` finished.
       */
      schedule: function(fn, ...args) {
        limiter.submit.call(limiter, fn, ...args);
      },
    };
  },
};
