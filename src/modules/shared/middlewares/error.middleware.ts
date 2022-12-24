import { Request, Response, NextFunction } from 'express'
import HttpException from '@/shared/errors/errors.httpException'

/**
 * Express global error handler
 * @param err - HttpException passed from controllers
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export default function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = err.statusCode || 500
  const message = err.message || 'Something went wrong!'

  res.status(status).json({
    status,
    message,
  })
}
