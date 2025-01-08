"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Home, Package, Truck, FileText, Settings, LogOut, DollarSign, Calendar, MessageSquare, ClipboardList, CreditCard } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const getRoutes = (role: 'client' | 'contractor') => {
  const commonRoutes = [
    { name: 'Dashboard', href: `/dashboard/${role}`, icon: Home },
    { name: 'Messages', href: `/dashboard/${role}/messages`, icon: MessageSquare },
    { name: 'Settings', href: `/dashboard/${role}/settings`, icon: Settings },
  ]

  const clientRoutes = [
    { name: 'New Order', href: '/dashboard/client/new-order', icon: Package },
    { name: 'Projects', href: '/dashboard/client/projects', icon: ClipboardList },
    { name: 'Proposals', href: '/dashboard/client/proposals', icon: FileText },
    { name: 'Order History', href: '/dashboard/client/order-history', icon: FileText },
    { name: 'Payments', href: '/dashboard/client/payments', icon: CreditCard },
  ]

  const contractorRoutes = [
    { name: 'Jobs', href: '/dashboard/contractor/jobs', icon: Truck },
    { name: 'Schedule', href: '/dashboard/contractor/schedule', icon: Calendar },
    { name: 'Earnings', href: '/dashboard/contractor/earnings', icon: DollarSign },
    { name: 'Job History', href: '/dashboard/contractor/job-history', icon: FileText },
  ]

  return role === 'client' 
    ? [...commonRoutes, ...clientRoutes]
    : [...commonRoutes, ...contractorRoutes]
}

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const routes = getRoutes(user?.role || 'client')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold">EcoWaste</span>
      </div>
      <div className="px-3 py-2">
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9"
        />
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          {filteredRoutes.map((route) => (
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

