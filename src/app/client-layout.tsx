"use client"

import { ThemeProvider } from "../components/theme-provider"

import { Toaster } from "../components/ui/toaster"
import { SessionProvider } from 'next-auth/react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>

          {children}
          <Toaster />

      </SessionProvider>
    </ThemeProvider>
  )
}
