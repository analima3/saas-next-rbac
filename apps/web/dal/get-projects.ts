import { api } from './api-client'

interface GetProjectsResponse {
  projects: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    ownerId: string
    organizationId: string
    description: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(orgSlug: string) {
  const response = await api
    .get(`/organizations/${orgSlug}/projects`, {
      next: {
        tags: [`${orgSlug}/projects`],
      },
    })
    .json<GetProjectsResponse>()

  return response
}
