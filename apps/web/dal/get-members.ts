import 'server-only'

import { api } from './api-client'
import { Role } from '@acl/auth'

interface GetMembersResponse {
  members: {
    userId: string
    name: string | null
    id: string
    avatarUrl: string | null
    email: string
    role: Role
  }[]
}

export async function getMembers(orgSlug: string) {
  const response = await api
    .get(`/organizations/${orgSlug}/members`, {
      next: {
        tags: [`${orgSlug}/members`],
      },
    })
    .json<GetMembersResponse>()

  return response
}
