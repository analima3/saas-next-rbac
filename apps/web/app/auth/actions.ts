import { redirect } from 'next/navigation'

export function signInWithGithub() {
  const githubSignInURL = new URL('/login/oauth/authorize', 'http://github.com')

  githubSignInURL.searchParams.set('client_id', 'Ov23liBuIIs73HUj7TTW')
  githubSignInURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback'
  )
  githubSignInURL.searchParams.set('scope', 'user')

  redirect(githubSignInURL.toString())
}
