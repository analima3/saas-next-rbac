'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'
import { signUp as signUpDal } from '@/dal/sign-up'

const signUpSchema = z
  .object({
    name: z
      .string()
      .refine(
        (value) => value.split(' ').length > 1,
        'Please, input your full name.'
      ),
    email: z.string().email('Please, input a valid e-mail address.'),
    password: z.string().min(6, 'Passowrd should have at least 6 characters.'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password_confirmation === data.password, {
    message: 'Your password and password confirmation must be the same.',
    path: ['password_confirmation'],
  })

export async function signUp(data: FormData) {
  const signUp = signUpSchema.safeParse(Object.fromEntries(data))

  if (!signUp.success) {
    const errors = signUp.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, email, password } = signUp.data

    await signUpDal({
      name,
      email,
      password,
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
