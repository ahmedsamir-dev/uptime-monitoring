import { Schema, model } from 'mongoose'
import { ICheckSchema } from '@/check/check.interfaces'

const checkSchema = new Schema<ICheckSchema>({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  protocol: { type: String, required: true },
  port: { type: Number, required: false },
  webhook: { type: String, required: false },
  timeout: { type: Number, required: false },
  interval: { type: Number, required: false },
  threshold: { type: Number, required: false },
  authentication: {
    type: { username: { type: String, required: true }, password: { type: String, required: true } },
    required: false,
  },
  httpHeaders: { type: [String], required: false },
  assert: {
    type: { statusCode: { type: Number, required: true } },
    required: false,
  },
  tags: { type: [String], required: false },
  ignoreSSL: { type: Boolean, required: false },
})

const Check = model<ICheckSchema>('Check', checkSchema)

export default Check
