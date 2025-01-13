import { supabase } from './supabaseClient'

export const configureOAuth = () => {
  return {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
      authorization: {
        url: 'https://appleid.apple.com/auth/authorize',
        params: {
          response_type: 'code',
          response_mode: 'form_post'
        }
      }
    }
  }
}

export const handleOAuthCallback = async (provider: 'google' | 'apple', code: string) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXTAUTH_URL}/dashboard`,
      queryParams: {
        code
      }
    }
  })

  if (error) throw error
  return data
}
