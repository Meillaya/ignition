"use client"


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Home, Package, Truck, FileText, Settings, LogOut, DollarSign } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import Image from 'next/image';

const getRoutes = (role: 'client' | 'contractor') => {
  const commonRoutes = [
    { name: 'Dashboard', href: `/dashboard/${role}`, icon: Home },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const clientRoutes = [
    { name: 'New Order', href: '/dashboard/client/new-order', icon: Package },
    { name: 'Order History', href: '/dashboard/client/order-history', icon: FileText },
  ]

  const contractorRoutes = [
    { name: 'Available Jobs', href: '/dashboard/contractor/available-jobs', icon: Truck },
    { name: 'Job History', href: '/dashboard/contractor/job-history', icon: FileText },
    { name: 'Earnings', href: '/dashboard/contractor/earnings', icon: DollarSign },
  ]

  return role === 'client' 
    ? [...commonRoutes, ...clientRoutes]
    : [...commonRoutes, ...contractorRoutes]
}

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const routes = getRoutes(user?.role || 'client')

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
      <Image
          src="/foxinthetruck.jpg"
          alt="Fox In The Truck"
          width={35}
          height={20}
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
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

