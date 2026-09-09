import type { InternalOrganization, Organization } from '../models/organization'

export function toInternalOrganization(
  organization: Organization
): InternalOrganization {
  return {
    __typename: 'Organization',
    ...organization,
  }
}
