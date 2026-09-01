import type { Organization } from '../models/organization'

type Actions = 'manage' | 'update' | 'delete' | 'transfer_ownership'
type Subject = 'Organization' | Organization

export type OrganizationSubject = [Actions, Subject]
