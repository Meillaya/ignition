import type  { Metadata } from 'next'
import { Geist } from 'next/font/google'
import ClientLayout from './client-layout'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}



import './globals.css'
