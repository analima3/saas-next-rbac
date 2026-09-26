'use server'

import { acceptInvite } from '@/dal/accept-invite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signInFromInviteAction(
  inviteId: string,
  inviteEmail: string
) {
  const cookieStore = await cookies()

  cookieStore.set('inviteId', inviteId)

  redirect(`/auth/sign-in?email=${inviteEmail}`)
}

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  redirect('/')
}
