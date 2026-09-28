import { Suspense } from 'react'

import { SignInWithPasswordForm } from './sign-in-with-password-form'

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="sr-only">Loading sign-in form…</div>}>
      <SignInWithPasswordForm />
    </Suspense>
  )
}
