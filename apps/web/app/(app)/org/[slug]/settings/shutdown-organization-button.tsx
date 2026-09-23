import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/dal/shutdown-organization'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

export function ShutdownOrganization() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = await getCurrentOrganization()

    await shutdownOrganization({ orgSlug: currentOrg! })

    redirect('/')
  }

  return (
    <form action={shutdownOrganizationAction}>
      <Button type="submit" className="w-56" variant="destructive">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
