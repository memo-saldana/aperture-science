module.exports = class MyError extends Error {
  constructor(code,message, callstack){
    super(message);
    this.name = "CustomError";
    this.statusCode = code;
    if(callstack){
      this.stack = callstack;
    }
  }
  
}