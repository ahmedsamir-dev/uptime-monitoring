import bcrypt from 'bcrypt'
import { IUserSchema, IUserResult } from '@/user/user.interfaces'

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hashSync(password, 10)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isPasswordMatch = await bcrypt.compareSync(password, hashedPassword)

  return isPasswordMatch
}

export const buildUserResult = (completUser: IUserSchema): IUserResult => {
  return {
    id: completUser._id,
    name: completUser.name,
    email: completUser.email,
  }
}
