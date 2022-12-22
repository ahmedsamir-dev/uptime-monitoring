import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '@/shared/utils/jwt.utils'
import { log } from 'console'

export const authenticationMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get('authorization')
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const verifiedToken = verifyJWT(token)

    log(verifiedToken)
  }
  next()
}
