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
      // Ensure session is valid
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (!session || sessionError) {
        console.error('Session error:', sessionError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=session_error`)
      }

      // Verify user exists and has valid role
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id, role, email')
        .eq('id', session.user.id)
        .single()

      if (profileError || !profile) {
        console.error('Profile error:', profileError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=profile_error`)
      }

      // Ensure role is valid
      if (!['client', 'contractor'].includes(profile.role)) {
        console.error('Invalid role:', profile.role)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=invalid_role`)
      }

      // If user doesn't exist, create profile with role from additional data
      if (!profile || profileError?.code === 'PGRST116') {
        // Get additional data from URL params
        const additionalData = searchParams.get('additional_data')
          ? JSON.parse(searchParams.get('additional_data')!)
          : { role: 'client' }

        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            password: '',
            role: additionalData.role || 'client',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null
          }])

        if (insertError) {
          console.error('Error creating user profile:', insertError)
          return NextResponse.redirect(`${origin}/auth/auth-code-error?error=profile_creation_failed`)
        }
      }

      // Redirect based on role
      const redirectPath = profile?.role === 'contractor' 
        ? '/dashboard' 
        : profile?.role === 'client'
        ? '/dashboard'
        : '/onboarding'

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

  // Handle error cases
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  
  if (error) {
    console.error('OAuth Error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${error}`)
  }

  // If no code, redirect to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code`)
}
