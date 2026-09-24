import { Button } from '@/components/ui/button'
import { XOctagon } from 'lucide-react'
import { revokeInviteAction } from './actions'

interface RevokeInviteButton {
  inviteId: string
}

export async function RevokeInviteButton({ inviteId }: RevokeInviteButton) {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button type="submit" size="xs" variant="destructive">
        <XOctagon className="mr-2 size-4" /> Revoke invite
      </Button>
    </form>
  )
}
