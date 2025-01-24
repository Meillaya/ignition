import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = false

export async function GET(request: Request) {
  // For static export, we can't use server-side auth
  // Redirect to client-side auth handling
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get('next') ?? '/'
  return NextResponse.redirect(new URL(`/auth/handle-callback?next=${next}`, origin))
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Ensure session cookies are set
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Failed to get session')

      // Check if user needs onboarding
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      // If no role is set, redirect to onboarding
      const redirectPath = !profile?.role ? '/onboarding' : next

      // Create response with cookies
      const response = NextResponse.redirect(new URL(redirectPath, origin))
      
      // Set auth cookies
      response.cookies.set('sb-access-token', session.access_token, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      response.cookies.set('sb-refresh-token', session.refresh_token, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      return response
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
