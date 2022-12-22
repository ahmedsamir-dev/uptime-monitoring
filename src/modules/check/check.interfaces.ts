import { SignUpDTO, SignInDTO, VerifyDTO } from '@/user/user.dtos'
import mongoose from 'mongoose'
import { Ok, Err, Result } from 'ts-results'

export interface IUserService {
  signup(dto: SignUpDTO): Promise<Result<IUserResult, string>>
  signin(dto: SignInDTO): Promise<Result<IUserResult, string>>
  verify(dto: VerifyDTO): Promise<Result<string, string>>
}

export interface IUserSchema extends mongoose.Document {
  name: string
  url: string
  protocol: string
  path?: string
  port?: number
  webhook?: string
  timeout?: number
  interval?: number
  threshold?: number
  authentication?: {
    username: string
    password: string
  }
  httpHeaders?: []
  assert?: {
    statusCode: number
  }
  tags?: string[]
  ignoreSSL?: boolean
}

export interface IUserResult {
  name: string
  email: string
  id: string
}
