const Bottleneck = require("bottleneck");

module.exports = {
  new: function({ concurrency }) {
    const limiter = new Bottleneck({ maxConcurrent: concurrency });

    return {
      schedule: function(fn, ...args) {
        limiter.submit.call(limiter, fn, ...args);
      },
    };
  },
};
