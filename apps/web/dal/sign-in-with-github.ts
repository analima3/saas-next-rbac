import 'server-only'

import { api } from './api-client'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub(data: SignInWithGithubRequest) {
  const response = await api
    .post('/auth/github', {
      json: data,
    })
    .json<SignInWithGithubResponse>()

  return response
}
