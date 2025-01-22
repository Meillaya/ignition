"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { createClient } from '@/utils/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<User|null>(null)
  const [role, setRole] = useState<string|null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Get role from dedicated roles table instead of user_metadata
      const { data: roleData } = await supabase
        .from('roles')
        .select('role')
        .eq('user_id', user.id)
        .single()

      if (!roleData?.role) {
        router.push('/onboarding')
        return
      }

      setUser(user)
      setRole(roleData.role)
    }

    checkAuth()
  }, [router, supabase])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

