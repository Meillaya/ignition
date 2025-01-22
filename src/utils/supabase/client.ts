import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Creates a Supabase client configured to automatically manage sessions
  // using cookies with SameSite lax policy and secure cookies in production
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.at(2)
        },
      },
    }
  )
}
