import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" name="email" id="email" />
      </div>

      <Button className="w-full" type="submit">
        Recover your password
      </Button>

      <Button
        className="w-full"
        variant="link"
        nativeButton={false}
        size="sm"
        render={<Link href="/auth/sign-in">Sign in instead</Link>}
      ></Button>
    </form>
  )
}
