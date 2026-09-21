'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import githubIcon from '@/assets/github-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signUp } from './action'
import { useFormState } from '@/hooks/use-form-state'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { signInWithGithub } from '../actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUp,
    goToHomePage
  )

  function goToHomePage() {
    router.push('/')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign up failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">Name</Label>
          <Input name="name" id="name" />

          {errors?.name && (
            <p className="text-destructive text-xs font-medium">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" name="email" id="email" />

          {errors?.email && (
            <p className="text-destructive text-xs font-medium">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />

          {errors?.password && (
            <p className="text-destructive text-xs font-medium">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />

          {errors?.password_confirmation && (
            <p className="text-destructive text-xs font-medium">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button
          className="w-full"
          variant="link"
          nativeButton={false}
          size="sm"
          render={<a href="/auth/sign-in">Already registered? Sign in</a>}
        ></Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" className="w-full" variant="outline">
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
