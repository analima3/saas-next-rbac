import type { Organization } from '../models/organization'

type Actions = 'manage' | 'create' | 'update' | 'delete' | 'transfer_ownership'
type Subject = 'Organization' | Organization

export type OrganizationSubject = [Actions, Subject]
