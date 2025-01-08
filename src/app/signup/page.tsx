import { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from '@/components/signup-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sign Up - EcoWaste',
  description: 'Create your EcoWaste account',
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Beautiful design */}
      <div className="hidden w-1/2 lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-3xl" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div>
            <Link href="/" className="text-2xl font-bold">EcoWaste</Link>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold">Join EcoWaste Today</h1>
            <p className="text-xl">
              Create your account and start managing your construction waste efficiently and sustainably.
            </p>
            <div className="h-1 w-20 bg-white rounded" />
            <blockquote className="text-lg italic">
              "Signing up with EcoWaste was the best decision for our waste management needs. 
              It's user-friendly and has greatly improved our efficiency."
            </blockquote>
            <p className="font-semibold">- John Smith, Project Manager</p>
          </div>
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md" />
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md" />
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md" />
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center">
        <div className="p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 max-w-md w-full mx-auto space-y-8">
          <Button
            asChild
            variant="ghost"
            className="absolute left-4 top-4 md:left-8 md:top-8"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">
              Sign up now to start managing your waste efficiently
            </p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-primary underline underline-offset-4"
            >
              Already have an account? Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

