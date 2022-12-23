import { CreateCheckDTO, GetCheckDTO, DeleteCheckDTO, UpdateCheckDTO } from '@/check/check.dtos'
import mongoose, { Schema } from 'mongoose'
import { Result } from 'ts-results'

export interface ICheckService {
  create(dto: CreateCheckDTO, userId: string): Promise<Result<ICheckSchema, string>>
  getOne(dto: GetCheckDTO): Promise<Result<ICheckSchema, string>>
  update(dto: UpdateCheckDTO): Promise<Result<ICheckSchema, string>>
  delete(dto: DeleteCheckDTO): Promise<Result<true, string>>
}

export interface ICheckSchema extends mongoose.Document {
  name: string
  url: string
  protocol: string
  path?: string
  port?: number
  email?: string
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
  createdBy?: Schema.Types.ObjectId
}

// export interface IUserResult {
//   name: string
//   email: string
//   id: string
// }
