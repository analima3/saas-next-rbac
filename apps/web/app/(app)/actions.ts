'use server'

import { acceptInvite } from '@/dal/accept-invite'
import { rejectInvite } from '@/dal/reject-invite'
import { refresh, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function redirectToPathAction(
  orgSlug: string,
  projectSlug?: string
) {
  const path = projectSlug
    ? `/org/${orgSlug}/project/${projectSlug}`
    : `/org/${orgSlug}`

  refresh()
  redirect(path)
}

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  updateTag('organizations')
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite(inviteId)
}
