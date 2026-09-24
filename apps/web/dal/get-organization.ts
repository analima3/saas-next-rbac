import 'server-only'

import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    id: string
    name: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    ownerId: string
  }
}

export async function getOrganization(orgSlug: string) {
  const response = await api
    .get(`/organizations/${orgSlug}`)
    .json<GetOrganizationResponse>()

  return response
}
