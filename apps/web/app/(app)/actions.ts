'use server'

import { refresh, revalidatePath } from 'next/cache'
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
