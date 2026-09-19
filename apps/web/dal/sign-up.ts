import 'server-only'

import { api } from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

export async function signUp(data: SignUpRequest) {
  const response = await api.post('/auth/create-account', {
    json: data,
  })

  return response
}
