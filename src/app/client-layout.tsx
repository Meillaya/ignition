"use client"

import { ThemeProvider } from "./_components/theme-provider"


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
        <trpc.Provider client={TRPCProvider} queryClient={new QueryClient()}>
          {children}
        </trpc.Provider>
      </SessionProvider>
    </ThemeProvider>
  )
}
