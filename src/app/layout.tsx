import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from "../components/theme-provider"
import { AuthProvider } from "../components/auth-provider"
import { Toaster } from "../components/ui/toaster"

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'EcoWaste - Construction Waste Management',
  description: 'Efficient and sustainable construction waste management solutions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'