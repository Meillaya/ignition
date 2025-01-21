'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createClient } from '@/utils/supabase/client'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

interface OAuthButtonsProps {
  isLoading?: boolean
}

export function OAuthButtons({ isLoading }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  // Generate nonce for Google One-Tap
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
    const encoder = new TextEncoder()
    const encodedNonce = encoder.encode(nonce)
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    return [nonce, hashedNonce]
  }

  // Initialize Google One-Tap
  useEffect(() => {
    const initializeGoogleOneTap = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) return

      const [nonce, hashedNonce] = await generateNonce()

      /* global google */
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: { credential: string }) => {
          try {
            setLoadingProvider('google')
            const { error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.credential,
              nonce,
            })

            if (error) throw error
            router.push('/dashboard')
          } catch (error) {
            console.error('Google One-Tap error:', error)
          } finally {
            setLoadingProvider(null)
          }
        },
        nonce: hashedNonce,
        use_fedcm_for_prompt: true,
      })

      google.accounts.id.prompt()
    }

    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      initializeGoogleOneTap()
    }
  }, [router, supabase])

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    try {
      setLoadingProvider(provider)
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
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
      console.error(`Error signing in with ${provider}:`, error)
      setLoadingProvider(null)
    }
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
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
    </>
  )
}
