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
      
      // Get selected role from local storage or prompt
      const selectedRole = localStorage.getItem('selectedRole') || 'client'
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // Pass role as additional parameter
            additional_data: JSON.stringify({ role: selectedRole })
          }
        },
      })

      if (error) throw error
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
      setLoadingProvider(null)
    }
  }



  const handleRoleSelection = (role: 'client' | 'contractor') => {
    localStorage.setItem('selectedRole', role)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => handleRoleSelection('client')}
          className="flex-1"
        >
          I'm a Client
        </Button>
        <Button
          variant="outline"
          onClick={() => handleRoleSelection('contractor')}
          className="flex-1"
        >
          I'm a Contractor
        </Button>
      </div>
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
