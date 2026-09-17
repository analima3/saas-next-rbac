import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import githubIcon from '@/assets/github-icon.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Name</Label>
        <Input name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" name="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_cofirmation">Confirm your password</Label>
        <Input
          type="password"
          name="password_cofirmation"
          id="password_cofirmation"
        />
      </div>

      <Button className="w-full" type="submit">
        Create account
      </Button>

      <Button
        className="w-full"
        variant="link"
        nativeButton={false}
        size="sm"
        render={<a href="/auth/sign-in">Already registered? Sign in</a>}
      ></Button>

      <Separator />

      <Button className="w-full" variant="outline">
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        Sign up with Github
      </Button>
    </form>
  )
}
