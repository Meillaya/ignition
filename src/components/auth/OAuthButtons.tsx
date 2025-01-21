import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { createClient } from '@/utils/supabase/client'

interface OAuthButtonsProps {
  isLoading?: boolean
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const supabase = createClient()

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    try {
      setLoadingProvider(provider)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) throw error

      // After successful auth, check/create user in public.users table
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          })

        if (upsertError) {
          console.error('Error upserting user:', upsertError)
        }
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
      setLoadingProvider(null)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full relative"
        onClick={() => handleOAuthSignIn('google')}
        disabled={isLoading || loadingProvider === 'google'}
      >
        {loadingProvider === 'google' ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
        )}
        Google
      </Button>

      <Button
        variant="outline"
        className="w-full relative"
        onClick={() => handleOAuthSignIn('apple')}
        disabled={isLoading || loadingProvider === 'apple'}
      >
        {loadingProvider === 'apple' ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <Image
            src="/apple.svg"
            alt="Apple"
            width={20}
            height={20}
            className="mr-2"
          />
        )}
        Apple
      </Button>
    </div>
  )
}
