import { CreateCheckDTO } from '@/check/check.dtos'
import mongoose from 'mongoose'
import { Result } from 'ts-results'

export interface ICheckService {
  create(dto: CreateCheckDTO): Promise<Result<string, string>>
  getOne(dto: CreateCheckDTO): Promise<Result<string, string>>
  update(dto: CreateCheckDTO): Promise<Result<string, string>>
  delete(dto: CreateCheckDTO): Promise<Result<string, string>>
}

export interface ICheckSchema extends mongoose.Document {
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

// export interface IUserResult {
//   name: string
//   email: string
//   id: string
// }
