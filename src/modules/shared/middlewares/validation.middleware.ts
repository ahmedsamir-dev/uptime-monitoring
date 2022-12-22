import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ZodError, ZodTypeAny } from 'zod'
import HttpException from '@/shared/errors/errors.httpException'

export default function validationMiddleWare<T extends ZodTypeAny>(schema: T): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await schema
      .parseAsync(req.body)
      .then((value) => {
        req.body = value
        next()
      })
      .catch((zodError: ZodError) => {
        zodError.errors.length = 1
        const errorMessage = zodError.errors[0].message

        next(new HttpException(errorMessage, 400))
      })
  }
}
