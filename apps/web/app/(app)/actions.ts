'use server'

import { refresh, revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function switchOrganization(orgSlug: string) {
  refresh()
  redirect(`/org/${orgSlug}`)
}
