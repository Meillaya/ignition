import { cn } from "@/lib/utils"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-orange-950 dark:via-gray-950 dark:to-orange-950 p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 blur-3xl transform rotate-12 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-orange-500/10 via-red-500/10 to-yellow-500/10 blur-3xl transform -rotate-12 animate-pulse" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="relative w-20 h-20 mb-4">
            <Image
              src="/foxinthetruck.jpg"
              alt="Fox In The Truck"
              fill
              className="rounded-full shadow-lg object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
            {description}
          </p>
        </div>

        <div className={cn(
          "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl",
          "border border-gray-200 dark:border-gray-800",
          "p-8 w-full animate-fade-in transition-all duration-300"
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}