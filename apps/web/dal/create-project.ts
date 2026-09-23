import 'server-only'

import { api } from './api-client'

interface CreateProject {
  org: string
  name: string
  description: string
}

export async function createProject({ name, description, org }: CreateProject) {
  if (!org) {
    return null
  }

  const response = await api.post(`/organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  })

  return response
}
