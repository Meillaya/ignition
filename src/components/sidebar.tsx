"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import { Button } from '@/src/components/ui/button'
import { ScrollArea } from '@/src/components/ui/scroll-area'
import { Home, Package, Truck, FileText, Settings, LogOut } from 'lucide-react'

const routes = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'New Order', href: '/dashboard/new-order', icon: Package },
  { name: 'Order History', href: '/dashboard/order-history', icon: FileText },
  { name: 'Job Board', href: '/dashboard/job-board', icon: Truck },
  { name: 'Earnings', href: '/dashboard/earnings', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold">EcoWaste</span>
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

