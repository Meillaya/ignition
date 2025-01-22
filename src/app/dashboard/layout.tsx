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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
      } else if (!user.user_metadata?.role) {
        router.push('/onboarding')
      }
    }

    checkAuth()
  }, [router, supabase])

  const { data: { user } } = supabase.auth.getUser()
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

