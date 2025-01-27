import { Button } from '@/app/_components/ui/button'
import { ModeToggle } from '@/app/_components/mode-toggle'
import { Bell } from 'lucide-react'

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Welcome to Fox In The Truck</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}

