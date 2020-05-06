module.exports = class MyError extends Error {
  /**
   * Custom error constructor
   * @param {Number} code Status code for error response
   * @param {String} message Message for error response
   * @param {Object} callstack Current callstack to for debuging
   */
  constructor(code, message, callstack) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = code;
    if (callstack) {
      this.stack = callstack;
    }
  }
};
