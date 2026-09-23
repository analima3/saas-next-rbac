import 'server-only'

import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    name: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
  }
}

export async function getOrganization(orgSlug: string) {
  const {
    organization: { name, domain, shouldAttachUsersByDomain },
  } = await api.get(`/organizations/${orgSlug}`).json<GetOrganizationResponse>()

  return { name, domain, shouldAttachUsersByDomain }
}
