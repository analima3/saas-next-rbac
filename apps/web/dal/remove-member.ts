import 'server-only'

import { api } from './api-client'

interface RemoveMemberRequest {
  orgSlug: string
  memberId: string
}

export async function removeMember({ orgSlug, memberId }: RemoveMemberRequest) {
  await api.delete(`/organizations/${orgSlug}/members/${memberId}`)
}
