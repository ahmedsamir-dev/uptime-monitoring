import { z } from 'zod'
import { randomUUID } from 'crypto'

// Schemas Area
export const createCheckSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .min(1, { message: 'name can not be empty string' }),

  url: z
    .string({
      required_error: 'url is required',
      invalid_type_error: 'url must be a string',
    })
    .url({
      message: 'url is invalid',
    }),

  protocol: z.enum(['HTTP', 'HTTPS', 'TCP']),

  path: z.string({
    invalid_type_error: 'path must be a string',
  }),

  port: z
    .number({
      invalid_type_error: 'port must be a number',
    })
    .positive('port must be positive'),

  webhook: z.string({
    invalid_type_error: 'webhook must be a string',
  }),

  timeout: z
    .number({
      invalid_type_error: 'timeout must be a number',
    })
    .positive('timeout must be positive')
    .default(5)
    .transform((val) => {
      return val * 1000
    }),

  interval: z
    .number({
      invalid_type_error: 'interval must be a number',
    })
    .positive('interval must be positive')
    .default(10)
    .transform((val) => {
      return val * 60 * 1000
    }),

  threshold: z
    .number({
      invalid_type_error: 'threshold must be a number',
    })
    .positive('interval must be positive')
    .default(1),

  authentication: z.object({
    username: z.string({
      invalid_type_error: 'username must be a string',
    }),
    password: z
      .string({
        invalid_type_error: 'password must be a string',
      })
      .optional(),

    tags: z.array(z.string()).optional(),
    httpHeaders: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),

    assert: z.object({
      statusCode: z
        .number({
          invalid_type_error: 'interval must be a number',
        })
        .positive('interval must be positive'),
    }),

    ignoreSSL: z
      .boolean({
        invalid_type_error: 'interval must be boolean',
      })
      .optional(),
  }),
})
