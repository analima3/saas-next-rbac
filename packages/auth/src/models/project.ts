export type Project = {
  id: string
  ownerId: string
}

export type InternalProject = Project & {
  __typename: 'Project'
}
