import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/dal/get-invites'
import { ability } from '@/lib/ability'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { Crown, XOctagon } from 'lucide-react'
import { RevokeInviteButton } from './revoke-invite-button'
import { CreateInviteForm } from './create-invite-form'

export async function Invites() {
  const permissions = await ability()

  const currentOrg = await getCurrentOrganization()

  const { invites } = await getInvites(currentOrg!)

  const canCreateInvite = permissions?.can('create', 'Invite')
  const canDeleteInvite = permissions?.can('delete', 'Invite')

  return (
    <div className="space-y-4">
      {canCreateInvite && (
        <Card>
          <CardHeader>
            <CardTitle>Invite a member</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => {
                return (
                  <TableRow key={invite.id} className="space-x-4">
                    <TableCell className="py-2.5" style={{ width: '100%' }}>
                      <span className="text-muted-foreground">
                        {invite.email}
                      </span>
                    </TableCell>

                    <TableCell className="py-2.5">{invite.role}</TableCell>

                    <TableCell className="py-2.5">
                      <div className="flex items-center justify-end gap-2">
                        {canDeleteInvite && (
                          <RevokeInviteButton inviteId={invite.id} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

              {!invites.length && (
                <TableRow>
                  <TableCell className="text-muted-foreground text-center">
                    No invites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
