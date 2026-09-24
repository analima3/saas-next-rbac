'use server'

import { createInvite } from '@/dal/create-invite'
import { removeMember } from '@/dal/remove-member'
import { revokeInvite } from '@/dal/revoke-invite'
import { updateMember } from '@/dal/update-member'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { Role } from '@acl/auth'
import { HTTPError } from 'ky'
import { updateTag } from 'next/cache'
import z from 'zod'

const inviteSchema = z.object({
  email: z.string().email('Please, provide a valid e-mail address.'),
  role: z.nativeEnum(Role),
})

export async function createInviteAction(data: FormData) {
  const currentOrg = await getCurrentOrganization()

  const inviteParse = inviteSchema.safeParse(Object.fromEntries(data))

  if (!inviteParse.success) {
    const errors = inviteParse.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { email, role } = inviteParse.data

    await createInvite({
      orgSlug: currentOrg!,
      email,
      role,
    })

    updateTag(`${currentOrg}/invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.data

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully invite the user',
    errors: null,
  }
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrganization()

  await revokeInvite({
    orgSlug: currentOrg!,
    inviteId,
  })

  updateTag(`${currentOrg}/invites`)
}

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
