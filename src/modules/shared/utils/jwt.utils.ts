import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '@/user/user.model'

export const signJWT = (userId: string): string => {
  return jwt.sign({ userId }, String(process.env.JWT_SECRET), {
    expiresIn: String(process.env.JWT_EXPIRES_IN),
  })
}

interface IVerifyJWTResult {
  userId: string | null
  isValid: boolean
}

export const verifyJWT = async (token: string): Promise<IVerifyJWTResult> => {
  const result = jwt.verify(token, String(process.env.JWT_SECRET))

  //@ts-ignore
  const userId = result.userId

  const isUserAlreadyExist = await User.exists({ _id: userId })

  //User exists
  if (isUserAlreadyExist?._id) {
    return { userId, isValid: true }
  }

  return { userId: null, isValid: false }
}
