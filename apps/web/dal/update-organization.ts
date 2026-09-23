import 'server-only'

import { api } from './api-client'

interface UpdateOrganization {
  orgSlug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export async function updateOrganization({
  orgSlug,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganization) {
  const response = await api.put(`/organizations/${orgSlug}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })

  return response
}
