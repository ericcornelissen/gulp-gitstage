const log = require("gulplog");

const { pluginTag } = require("./constants.js");

/**
 * Provides an API to log tagged messages using printf-style strings.
 * @module log
 */
module.exports = {
  /**
   * @param  {String} message - The message to log.
   * @param  {Any} ...args - Arguments for the message.
   * @example
   * debug("Hello %s!", "world");
   * // -> [gulp-gitstage] Hello world!
   */
  debug: function(message, ...args) {
    log.debug(`[${pluginTag}] ${message}`, ...args);
  },
};
