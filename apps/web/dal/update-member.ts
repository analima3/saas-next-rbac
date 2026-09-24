import { Role } from '@acl/auth'

import { api } from './api-client'

interface UpdateMemberRequest {
  orgSlug: string
  memberId: string
  role: Role
}

export async function updateMember({
  orgSlug,
  memberId,
  role,
}: UpdateMemberRequest) {
  await api.put(`organizations/${orgSlug}/members/${memberId}`, {
    json: { role },
  })
}
