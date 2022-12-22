import { z } from 'zod'
import { randomUUID } from 'crypto'

// Schemas Area
export const signUpSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .min(1, { message: 'name can not be empty string' }),

  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({
      message: 'email is invalid',
    }),

  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .min(8, { message: 'password must be 8 characters or more' }),
})

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
})

export const verifySchema = z.object({
  pin: z.string({
    required_error: 'pin is required',
    invalid_type_error: 'pin must be a string',
  }),

  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({
      message: 'email is invalid',
    }),
})
