import type { InternalOrganization } from '../models/organization'

type Actions = 'manage' | 'update' | 'delete' | 'transfer_ownership'
type Subject = 'Organization' | InternalOrganization

export type OrganizationSubject = [Actions, Subject]
