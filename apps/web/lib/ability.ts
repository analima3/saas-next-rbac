import { getUserMembership } from '@/dal/get-user-membership'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { defineAbilityFor } from '@acl/auth'

export async function ability() {
  const currentOrg = await getCurrentOrganization()

  if (!currentOrg) {
    return null
  }

  const { membership } = await getUserMembership(currentOrg)

  const userPermissions = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return userPermissions
}
