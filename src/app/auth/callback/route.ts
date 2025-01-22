import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
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

      // Check if user exists in profiles table
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      // If user doesn't exist, create profile with default role
      if (!profile || profileError?.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            role: 'client', // Default role
            created_at: new Date().toISOString()
          }])

        if (insertError) {
          console.error('Error creating user profile:', insertError)
          return NextResponse.redirect(`${origin}/auth/auth-code-error?error=profile_creation_failed`)
        }
      }

      // Redirect to onboarding if no role is set
      const redirectPath = profile?.role ? next : '/onboarding'

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
