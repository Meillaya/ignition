import  Metadata  from "next"
import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from '@/components/login-form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Login - Fox In The Truck',
  description: 'Login to your Fox In The Truck account',
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect(session.user.role === 'client' ? '/dashboard/client' : '/dashboard/contractor')
  }
  return (

      <div className="flex min-h-screen">
        {/* Left side - Beautiful design */}
        <div className="hidden w-1/2 lg:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-3xl" />
          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/foxinthetruck.jpg"
                  alt="Fox In The Truck"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-2xl font-bold">Fox In The Truck</span>
              </Link>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold">Welcome Back</h1>
              <p className="text-xl">
                Log in to your account to manage your waste disposal efficiently and sustainably.
              </p>
              <div className="h-1 w-20 bg-white rounded" />
              <blockquote className="text-lg italic">
                "Fox In The Truck has revolutionized how we handle construction waste. 
                The platform is intuitive and the service is exceptional."
              </blockquote>
              <p className="font-semibold">- Sofia Davis, Construction Manager</p>
            </div>
            <div className="flex space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md" />
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md" />
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md" />
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 flex flex-col justify-center">
          <div className="p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 max-w-md w-full mx-auto space-y-8">
            <Button
              asChild
              variant="ghost"
              className="absolute left-4 top-4 md:left-8 md:top-8 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In to Fox In The Truck</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>

            <LoginForm />

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/signup"
                className="hover:text-orange-600 dark:hover:text-orange-400 underline underline-offset-4"
              >
                Don't have an account? Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}

