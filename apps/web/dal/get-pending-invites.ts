import { api } from './api-client'
import { Role } from '@acl/auth'

interface GetPendingInvitesResponse {
  invites: {
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      name: string
    }
  }[]
}

export async function getPendingInvites() {
  const response = await api
    .get(`/invites/pending`)
    .json<GetPendingInvitesResponse>()

  return response
}
