import { cookies } from 'next/headers'

export async function getCurrentOrganization() {
  const cookieStore = await cookies()

  return cookieStore.get('org')?.value || null
}
