import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/dal/get-invite'
import { getUserInitialsByName } from '@/lib/get-initials-by-name'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowLeft, CheckCircle, LogIn, LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import { acceptInviteAction, signInFromInviteAction } from './actions'
import { getUserProfile } from '@/dal/get-user-profile'
import Link from 'next/link'
import { Marker, MarkerContent } from '@/components/ui/marker'

dayjs.extend(relativeTime)

interface InvitePage {
  params: Promise<{ id: string }>
}

export default async function InvitePage({ params }: InvitePage) {
  const cookieStore = await cookies()
  const isAuthenticated = !!cookieStore.get('token')?.value

  const { id } = await params

  const { invite } = await getInvite(id)

  const { email: currentUserEmail } = await getUserProfile()

  const isSameAuthenticatedUser = currentUserEmail === invite.email

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-24">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}

            {invite.author?.name && (
              <AvatarFallback>
                {getUserInitialsByName(invite.author.name)}
              </AvatarFallback>
            )}
          </Avatar>

          <p className="text-foreground font-medium">
            {invite.author?.name ?? 'Someone'}
          </p>

          <p className="text-muted-foreground text-center text-sm leading-relaxed text-balance">
            Invite you to join{' '}
            <span className="text-foreground font-medium">
              {invite.organization.name}
            </span>{' '}
            <span className="text-xs">
              ({dayjs(invite.createdAt).fromNow()})
            </span>
          </p>
        </div>

        <Separator />

        {!isAuthenticated && (
          <form
            action={signInFromInviteAction.bind(null, invite.id, invite.email)}
          >
            <Button type="submit" variant="secondary" className="w-full">
              <LogIn className="mr-1 size-4" />
              Sign in to accept the invite
            </Button>
          </form>
        )}

        {isSameAuthenticatedUser && (
          <form action={acceptInviteAction.bind(null, invite.id)}>
            <Button type="submit" variant="secondary" className="w-full">
              <CheckCircle className="mr-1 size-4" />
              Join {invite.organization.name}
            </Button>
          </form>
        )}

        {isAuthenticated && !isSameAuthenticatedUser && (
          <>
            <p className="text-muted-foreground text-center text-sm leading-relaxed text-balance">
              This invite was sent to{' '}
              <span className="text-foreground font-medium">
                {invite.email}
              </span>{' '}
              but you are currently authenticated as{' '}
              <span className="text-foreground font-medium">
                {currentUserEmail}
              </span>
              .
            </p>

            <Button
              variant="secondary"
              nativeButton={false}
              render={
                <a href="/api/auth/sign-out">
                  <LogOut className="mr-1 size-4" />
                  Sign out
                </a>
              }
            ></Button>

            <Marker variant="separator">
              <MarkerContent>or</MarkerContent>
            </Marker>

            <Button
              variant="ghost"
              nativeButton={false}
              render={
                <Link href="/">
                  <ArrowLeft className="mr-1 size-4" />
                  Back to dashboard
                </Link>
              }
            ></Button>
          </>
        )}
      </div>
    </div>
  )
}
