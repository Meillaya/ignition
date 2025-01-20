import type  { Metadata } from 'next'
import { Geist } from 'next/font/google'
import ClientLayout from './client-layout'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import './globals.css'
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Fox In The Truck - Construction Waste Management',
  description: 'Efficient and sustainable construction waste management solutions',
  icons: {
    icon: '/foxinthetruck(192png).png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#ea580c',
          colorTextOnPrimaryBackground: '#fff',
          colorTextSecondary: '#525252',
          colorBackground: '#fff',
          colorInputBackground: '#fff',
          colorShimmer: 'rgba(255,255,255,0.36)'
        },
        elements: {
          card: 'shadow-none border-0',
          headerTitle: 'hidden',
          headerSubtitle: 'hidden',
          socialButtonsBlockButton: 'border border-input hover:bg-accent',
          formButtonPrimary: 'bg-orange-600 hover:bg-orange-700',
          footerActionText: 'text-gray-600 dark:text-gray-300',
          footerActionLink: 'text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300'
        }
      }}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/login"
      signUpUrl="/signup"
    >
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
    </ClerkProvider>
  )
}




