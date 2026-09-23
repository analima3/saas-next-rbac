'use server'

import { createProject } from '@/dal/create-project'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string().min(25, 'Please, include at least 25 characters.'),
})

export async function createProjectAction(data: FormData) {
  const cookieStore = await cookies()
  const orgSlug = cookieStore.get('org')?.value

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
