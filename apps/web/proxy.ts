import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']
const protectedRoutes = ['/']

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const { pathname } = request.nextUrl

  const isPublicRoute = publicRoutes.includes(pathname)
  const isProtectedRoute = protectedRoutes.includes(pathname)

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
