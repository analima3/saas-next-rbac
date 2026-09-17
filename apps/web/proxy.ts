import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isPublicRoute = publicRoutes.includes(pathname)

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*'],
}
