import { defineAbilityFor, User } from '@acl/auth'
import { Role } from '@prisma/client'

export function getUserPermission(userId: string, role: Role) {
  const authUser: User = {
    id: userId,
    role,
  }

  const ability = defineAbilityFor(authUser)

  return ability
}
