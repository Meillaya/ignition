import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '../../components/login-form'
import { Button } from '../../components/ui/button'
import { ArrowLeft } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Login - EcoWaste',
  description: 'Login to your EcoWaste account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          asChild
          variant="ghost"
          className="absolute left-4 top-4 md:left-8 md:top-8"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/">EcoWaste</Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "EcoWaste has revolutionized how we handle construction waste. 
                The platform is intuitive and the service is exceptional."
              </p>
              <footer className="text-sm">Sofia Davis, Construction Manager</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/signup"
                className="hover:text-brand underline underline-offset-4"
              >
                Don't have an account? Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

