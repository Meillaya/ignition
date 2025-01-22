import { Button } from "@/components/ui/button"
import Image from "next/image"
import Script from "next/script"
import { useState, useEffect } from "react"
import { createClient } from '@/utils/supabase/client'

interface OAuthButtonsProps {
  isLoading?: boolean
}

declare global {
  interface Window {
    google: any
  }
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const supabase = createClient()

  // Initialize Google One Tap
  useEffect(() => {
    const initializeGoogleOneTap = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: true,
          itp_support: true,
          use_fedcm_for_prompt: true
        })
        
        // Show the One Tap prompt
        window.google.accounts.id.prompt()
      }
    }

    // Load Google script and initialize
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = initializeGoogleOneTap
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleGoogleSignIn = async (response: { credential: string }) => {
    try {
      setLoadingProvider('google')
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setLoadingProvider(null)
    }
  }

  const handleAppleSignIn = async () => {
    try {
      setLoadingProvider('apple')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Apple:', error)
      setLoadingProvider(null)
    }
  }



  return (
    <div className="grid grid-cols-2 gap-4">
      <div id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleGoogleSignIn"
        data-auto_select="true"
        data-itp_support="true"
      >
        <Button
          variant="outline"
          className="w-full relative"
          onClick={() => window.google?.accounts.id.prompt()}
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
      </div>

      <Button
        variant="outline"
        className="w-full relative"
        onClick={handleAppleSignIn}
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
