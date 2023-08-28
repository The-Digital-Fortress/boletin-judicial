import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'

export const validator = withZod(
  z.object({
    fileId: z.string().refine(
      value => {
        // Regular expression pattern to match the desired format
        const pattern = /^\d{1,4}\/\d{4}$/
        return pattern.test(value)
      },
      {
        message: 'El formato del ID de archivo no es válido',
      }
    ),
  })
)
