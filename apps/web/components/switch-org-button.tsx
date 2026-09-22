'use client'

import { switchOrganization } from '@/app/(app)/actions'
import { Button } from './ui/button'

export function SwitchOrgButton({
  children,
  orgSlug,
}: {
  children: React.ReactNode
  orgSlug: string
}) {
  return (
    <form action={() => switchOrganization(orgSlug)}>
      <Button
        type="submit"
        variant="ghost"
        className="flex w-full justify-start pl-4"
      >
        {children}
      </Button>
    </form>
  )
}
