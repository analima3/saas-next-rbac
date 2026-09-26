import 'server-only'

import { api } from './api-client'
import { Role } from '@acl/auth'

interface GetInvitesResponse {
  invite: {
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
  }
}

export async function getInvite(inviteId: string) {
  const response = await api
    .get(`/invites/${inviteId}`)
    .json<GetInvitesResponse>()

  return response
}
