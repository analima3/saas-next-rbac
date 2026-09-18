import 'server-only'

import { api } from './api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export async function signInWithPassword(data: SignInWithPasswordRequest) {
  const response = await api
    .post('/auth/password', {
      json: data,
    })
    .json<SignInWithPasswordResponse>()

  return response
}
