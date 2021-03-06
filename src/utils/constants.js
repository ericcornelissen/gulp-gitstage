/**
 * Provides constants used in one or more modules in the project.
 * @module constants
 */
module.exports = {
  /**
   * String that should be used for output from the plugin.
   * @constant {String}
   */
  pluginTag: "gulp-gitstage",

  /* === git commands\options === */

  /**
   * String denoting the 'git' command.
   * @constant {String}
   */
  git: "git",

  /**
   * String denoting the 'add' verb for 'git'. See {@link
   * https://git-scm.com/docs/git-update-index the docs}. Instead of using the
   * standard `git add` we use instead `git update-index`, as it is more
   * powerful.
   * @constant {String}
   */
  add: "update-index",

  /**
   * String denoting the 'update' option for the 'add' verb for 'git'. See
   * {@link https://git-scm.com/docs/git-update-index the docs}.
   * @constant {String}
   */
  update: "-g",

  /* === type names === */

  /**
   * Strings denoting the typeof variables.
   *
   * @constant
   * @property {String} function - The name of tye type Function.
   * @property {String} string - The name of the type String.
   * @example
   * const fn = () => 42
   * typeof fn === types.string
   */
  types: {
    function: "function",
    number: "number",
    string: "string",
  },
};
