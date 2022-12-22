import { z } from 'zod'
import { createCheckSchema } from '@/check/check.validations'

//DTOs Area
export type CreateCheckDTO = z.infer<typeof createCheckSchema>
