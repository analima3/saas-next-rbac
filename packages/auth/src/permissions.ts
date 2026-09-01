import type { AbilityBuilder, MongoAbility } from '@casl/ability'
import type { User } from './models/user'
import type { UserSubject } from './subjects/user'
import type { ProjectSubject } from './subjects/project'
import type { Role } from './roles'
import type { OrganizationSubject } from './subjects/organization'
import type { InviteSubject } from './subjects/invite'
import type { BillingSubject } from './subjects/billing'

export type AppAbilities =
  | UserSubject
  | ProjectSubject
  | OrganizationSubject
  | InviteSubject
  | BillingSubject
  | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>

export type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}
