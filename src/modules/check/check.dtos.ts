import { z } from 'zod'
import { createCheckSchema, updateCheckSchema } from '@/check/check.validations'

//DTOs Area
export type CreateCheckDTO = z.infer<typeof createCheckSchema>
export type GetCheckDTO = {
  userId: string
  checkId: string
}
export type DeleteCheckDTO = GetCheckDTO

export type UpdateCheckDTO = z.infer<typeof updateCheckSchema> & GetCheckDTO
