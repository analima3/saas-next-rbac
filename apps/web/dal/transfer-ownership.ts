import 'server-only'

import { api } from './api-client'

export async function transferOwnership(newOwnerId: string, orgSlug: string) {
  const response = await api.patch(`/organizations/${orgSlug}/owner`, {
    json: {
      newOwnerId,
    },
  })

  return response
}
