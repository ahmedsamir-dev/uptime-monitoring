/**
 * HttpException: main error class that sent from the controllers to express global error handler
 * @param message - Error message sent to the client in the response
 * @param statusCode - HTTP status code sent to the client in the response
 */
export default class HttpException extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
  }
}
