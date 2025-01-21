import { Button } from "@/components/ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { supabase } from '@/lib/supabaseClient'

interface OAuthButtonsProps {
  isLoading?: boolean
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setLoadingProvider(provider)
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
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