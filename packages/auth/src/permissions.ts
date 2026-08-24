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
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(_, { can }) {
    can('invite', 'User')
  },
  BILLING() {},
}
