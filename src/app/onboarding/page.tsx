'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { getSession } from 'next-auth/react'

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<'client' | 'contractor' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRoleSelection = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')
      
      // Get fresh auth state
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) throw new Error('Failed to refresh auth state');
      
      // Redirect and force client-side update
      router.refresh();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Please select your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant={selectedRole === 'client' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setSelectedRole('client')}
            >
              I'm a Client
            </Button>
            <Button
              variant={selectedRole === 'contractor' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setSelectedRole('contractor')}
            >
              I'm a Contractor
            </Button>
            <Button
              className="w-full"
              onClick={handleRoleSelection}
              disabled={!selectedRole || isLoading}
            >
              {isLoading ? 'Saving...' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
