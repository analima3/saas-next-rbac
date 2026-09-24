import { ability } from '@/lib/ability'
import { Invites } from './invites'
import { MemberList } from './member-list'

export default async function Members() {
  const permissions = await ability()

  const canGetInvites = permissions?.can('get', 'Invite')
  const canGetMemberList = permissions?.can('get', 'User')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="space-y-4">
        {canGetInvites && <Invites />}
        {canGetMemberList && <MemberList />}
      </div>
    </div>
  )
}
