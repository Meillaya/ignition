"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Home, 
  Package, 
  Truck, 
  FileText, 
  Settings, 
  LogOut, 
  DollarSign,
  ClipboardList,
  Briefcase,
  CalendarCheck
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

const getRoutes = (role: 'client' | 'contractor') => {
  const commonRoutes = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: Home 
    },
    { 
      name: 'Settings', 
      href: '/dashboard/settings', 
      icon: Settings 
    },
  ]

  const clientRoutes = [
    { 
      name: 'New Order', 
      href: '/dashboard/new-order', 
      icon: Package 
    },
    { 
      name: 'My Orders', 
      href: '/dashboard/order-history', 
      icon: ClipboardList 
    },
  ]

  const contractorRoutes = [
    { 
      name: 'Available Jobs', 
      href: '/dashboard/job-board', 
      icon: Briefcase 
    },
    { 
      name: 'My Jobs', 
      href: '/dashboard/my-jobs', 
      icon: Truck 
    },
  ]

  return [
    ...commonRoutes,
    ...(role === 'client' ? clientRoutes : contractorRoutes)
  ]
}

export function Sidebar() {
  const pathname = usePathname()
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  const routes = getRoutes(user.user_metadata?.role || 'client')

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 gap-2">
        <Image
          src="/foxinthetruck.jpg"
          alt="Fox In The Truck"
          width={35}
          height={35}
          className="rounded-full shadow-lg"
        />
        <span className="text-lg font-semibold">Fox In The Truck</span>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="mb-4 px-2 text-sm text-muted-foreground">
          <p>Logged in as:</p>
          <p className="font-medium">{user.email}</p>
          <p className="capitalize">({user.user_metadata?.role})</p>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

