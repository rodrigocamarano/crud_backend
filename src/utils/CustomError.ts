/**
 * Custom Error
 */
class CustomError extends Error {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
export default CustomError;
