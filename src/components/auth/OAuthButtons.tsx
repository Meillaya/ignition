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

  const generateNonce = async (): Promise<[string, string]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
    const encoder = new TextEncoder()
    const encodedNonce = encoder.encode(nonce)
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    return [nonce, hashedNonce]
  }

  const handleSignInWithGoogle = async (response: { credential: string }) => {
    try {
      setLoadingProvider('google')
      const [nonce] = await generateNonce()
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        nonce,
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setLoadingProvider(null)
    }
  }

  useEffect(() => {
    const initializeGoogleOneTap = async () => {
      const [_, hashedNonce] = await generateNonce()
      
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleSignInWithGoogle,
        nonce: hashedNonce,
        use_fedcm_for_prompt: true,
      })
      
      window.google?.accounts.id.prompt()
    }

    if (typeof window !== 'undefined') {
      initializeGoogleOneTap()
    }
  }, [])



  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <div className="grid grid-cols-2 gap-4">
        <div id="g_id_onload"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSignInWithGoogle"
          data-auto_select="true"
          data-itp_support="true"
          data-use_fedcm_for_prompt="true"
        />
        
        <div className="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        />

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
    </>
  )
}
