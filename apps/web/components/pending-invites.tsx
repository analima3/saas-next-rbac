'use client'

import { Check, UserPlus2, X } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useQuery } from '@tanstack/react-query'
import { getPendingInvites } from '@/dal/get-pending-invites'
import { useState } from 'react'
import { acceptInviteAction, rejectInviteAction } from '@/app/(app)/actions'
import { queryClient } from '@/lib/react-query'

dayjs.extend(relativeTime)

export function PeddingInvites() {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={
          <Button size="icon" variant="ghost">
            <UserPlus2 className="size-4" />
            <span className="sr-only">Pending invites</span>
          </Button>
        }
      ></PopoverTrigger>

      <PopoverContent className="w-96 space-y-2">
        <span className="block text-sm font-medium">
          Pedding invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-muted-foreground text-xs">No invites found.</p>
        )}

        {data?.invites.map((invite) => {
          return (
            <div className="space-y-2" key={invite.id}>
              <p className="text-muted-foreground text-xs leading-relaxed">
                <span className="text-foreground font-medium">
                  {invite.author?.name ?? 'Someone'}
                </span>{' '}
                invite you to join{' '}
                <span className="text-foreground font-medium">
                  {invite.organization.name}
                </span>{' '}
                <span className="text-xs">
                  {dayjs(invite.createdAt).fromNow()}
                </span>
              </p>

              <div className="flex justify-end gap-1">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleAcceptInvite(invite.id)}
                >
                  <Check className="mr-1 size-3" />
                  Accept
                </Button>

                <Button
                  onClick={() => handleRejectInvite(invite.id)}
                  size="xs"
                  variant="ghost"
                >
                  <X className="mr-1 size-3" />
                  Reject
                </Button>
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
