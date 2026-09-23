'use server'

import { createProject } from '@/dal/create-project'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { HTTPError } from 'ky'
import { z } from 'zod'

const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string().min(25, 'Please, include at least 25 characters.'),
})

export async function createProjectAction(data: FormData) {
  const orgSlug = await getCurrentOrganization()

  const projectParse = projectSchema.safeParse(Object.fromEntries(data))

  if (!projectParse.success) {
    const errors = projectParse.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, description } = projectParse.data

    await createProject({
      org: orgSlug!,
      name,
      description,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.data

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the project',
    errors: null,
  }
}
