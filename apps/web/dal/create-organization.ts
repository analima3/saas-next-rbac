import 'server-only'

import { api } from './api-client'

interface CreateOrganization {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export async function createOrganization(data: CreateOrganization) {
  const response = await api.post('/organizations', {
    json: data,
  })

  return response
}
