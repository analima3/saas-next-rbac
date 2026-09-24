import 'server-only'

import { api } from './api-client'
import { Role } from '@acl/auth'

interface CreateInviteRequest {
  orgSlug: string
  email: string
  role: Role
}

interface CreateInviteResponse {
  inviteId: string
}

export async function createInvite({
  orgSlug,
  email,
  role,
}: CreateInviteRequest) {
  const response = await api
    .post(`/organizations/${orgSlug}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateInviteResponse>()

  return response
}
