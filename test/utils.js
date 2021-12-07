const map = require("map-stream");

module.exports = {
  stdin: "stdin",
  stdout: "stdout",

  each: function (eachCallback) {
    return map((file, mapCallback) => {
      mapCallback(null, file);
      eachCallback(file);
    });
  },

  reduce: function () {
    let started = false;
    return map((file, callback) => {
      if (!started) {
        callback(null, file);
      } else {
        callback();
      }
    });
  },
};
