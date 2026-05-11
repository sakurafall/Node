export default class AppError extends Error {
  constructor(message, statusCode = 500, name = 'AppError') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
