'use server'

import { signInWithPassword } from '@/dal/sign-in-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email('Please, provide a valid e-mail address.'),
  password: z.string().min(1, 'Please, provide a password.'),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const signIn = signInSchema.safeParse(Object.fromEntries(data))

  if (!signIn.success) {
    const errors = signIn.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { email, password } = signIn.data

    const { token } = await signInWithPassword({
      email,
      password,
    })

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
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

  return { success: true, message: null, errors: null }
}
