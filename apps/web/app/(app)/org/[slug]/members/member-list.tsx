import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/dal/get-members'
import { getOrganization } from '@/dal/get-organization'
import { getUserMembership } from '@/dal/get-user-membership'
import { ability } from '@/lib/ability'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { toInternalOrganization } from '@acl/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const permissions = await ability()

  const currentOrg = await getCurrentOrganization()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getUserMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = toInternalOrganization({
    id: organization.id,
    ownerId: organization.ownerId,
  })

  const canTranferOwnershipOrganization = permissions?.can(
    'transfer_ownership',
    authOrganization
  )

  const canRemoverUser = permissions?.can('delete', 'User')
  const canUpdateMember = permissions?.can('update', 'User')

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <AvatarImage src={member.avatarUrl} />
                      )}
                    </Avatar>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.userId === membership.userId && (
                        <Badge
                          variant="outline"
                          className="border-purple-500 text-purple-500 dark:border-purple-500 dark:text-purple-500"
                        >
                          me
                        </Badge>
                      )}

                      {member.userId === organization.ownerId && (
                        <Badge
                          variant="outline"
                          className="border-purple-500 text-purple-500 dark:border-purple-500 dark:text-purple-500"
                        >
                          owner
                          <Crown className="size-4" />
                        </Badge>
                      )}
                    </div>
                    <p className="text-sx text-muted-foreground">
                      {member.email}
                    </p>
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      <UpdateMemberRoleSelect
                        value={member.role}
                        memberId={member.id}
                        disabled={
                          member.userId === membership.userId ||
                          member.userId === organization.ownerId ||
                          !canUpdateMember
                        }
                      />

                      {canTranferOwnershipOrganization && (
                        <Button size="xs" variant="ghost">
                          <ArrowLeftRight className="mr-1 size-4" />
                          Tranfer ownership
                        </Button>
                      )}

                      {canRemoverUser && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button
                            type="submit"
                            disabled={
                              member.userId === membership.userId ||
                              member.userId === organization.ownerId
                            }
                            size="xs"
                            variant="destructive"
                          >
                            <UserMinus className="mr-1 size-4" />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
