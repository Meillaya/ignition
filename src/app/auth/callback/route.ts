import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth Error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${error}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code`)
  }

  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // Exchange code for session
    const { data, error: authError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (authError) {
      console.error('Auth Error:', authError)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=auth_failed`)
    }

    // Ensure session is valid
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_session`)
    }

    // Check user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      console.error('Profile Error:', profileError)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=profile_error`)
    }

    // Determine redirect path
    const redirectPath = !profile?.role ? '/onboarding' : next

    // Create response with cookies
    const response = NextResponse.redirect(new URL(redirectPath, origin))
    
    // Set auth cookies
    response.cookies.set('sb-access-token', session.access_token, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    })
    response.cookies.set('sb-refresh-token', session.refresh_token, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    })

    return response

  } catch (error) {
    console.error('Unexpected Error:', error)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=unexpected_error`)
  }
}
