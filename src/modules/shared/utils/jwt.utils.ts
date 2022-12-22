import jwt, { JwtPayload } from 'jsonwebtoken'

export const signJWT = (userId: string): string => {
  return jwt.sign({ userId }, String(process.env.JWT_SECRET), {
    expiresIn: String(process.env.JWT_EXPIRES_IN),
  })
}

export const verifyJWT = (token: string): string | JwtPayload => {
  return jwt.verify(token, String(process.env.JWT_SECRET))
}
