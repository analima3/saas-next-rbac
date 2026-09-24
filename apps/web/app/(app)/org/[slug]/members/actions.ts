'use server'

import { removeMember } from '@/dal/remove-member'
import { updateMember } from '@/dal/update-member'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { Role } from '@acl/auth'
import { updateTag } from 'next/cache'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrganization()

  await removeMember({
    orgSlug: currentOrg!,
    memberId,
  })

  updateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrganization()

  await updateMember({
    orgSlug: currentOrg!,
    memberId,
    role,
  })

  updateTag(`${currentOrg}/members`)
}
