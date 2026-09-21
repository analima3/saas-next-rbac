import { Role } from '@acl/auth'
import { api } from './api-client'

interface GetUserMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getUserMembership(org: string) {
  const { membership } = await api
    .get(`/organizations/${org}/membership`)
    .json<GetUserMembershipResponse>()

  return { membership }
}
