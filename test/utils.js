const map = require("map-stream");

module.exports = {
  reduce: function() {
    let started = false;
    return map(function(file, callback) {
      if (!started) {
        callback(null, file);
      } else {
        callback();
      }
    });
  },

  verify: function(done, check) {
    if (typeof check !== "function") {
      throw new Error("expects a function");
    }

    return map(function(file, callback) {
      check();
      done();
    });
  },
};
