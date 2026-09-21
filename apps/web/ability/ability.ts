import { getUserMembership } from '@/dal/get-user-membership'
import { defineAbilityFor } from '@acl/auth'
import { cookies } from 'next/headers'

export async function ability() {
  const cookieStore = await cookies()
  const currentOrg = cookieStore.get('org')?.value

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
