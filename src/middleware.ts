import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = await getToken({ req: request })

  // Redirect logged-in users from public routes
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL(
      token.role === 'client' ? '/dashboard/client' : '/dashboard/contractor',
      request.url
    ))
  }

  // Redirect unauthenticated users from protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to appropriate dashboard based on role
  if (pathname === '/dashboard' && token) {
    return NextResponse.redirect(new URL(
      token.role === 'client' ? '/dashboard/client' : '/dashboard/contractor',
      request.url
    ))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
