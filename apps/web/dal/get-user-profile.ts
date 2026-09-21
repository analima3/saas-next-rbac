import { api } from './api-client'

interface GetUserProfileResponse {
  user: {
    name: string | null
    id: string
    avatarUrl: string | null
    email: string
  }
}

export async function getUserProfile() {
  const { user } = await api.get('/auth/profile').json<GetUserProfileResponse>()

  return user
}
