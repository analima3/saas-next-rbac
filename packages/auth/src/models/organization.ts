export type Organization = {
  id: string
  ownerId: string
}

export type InternalOrganization = Organization & {
  __typename: 'Organization'
}
