import { Metadata } from "next"
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { SignIn } from '@clerk/nextjs'
export const metadata: Metadata = {
  title: 'Login - Fox In The Truck',
  description: 'Login to your Fox In The Truck account',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-orange-950 dark:via-gray-950 dark:to-orange-950 p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/foxinthetruck.jpg"
            alt="Fox In The Truck"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Sign in to Fox In The Truck</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignIn 
          path="/login"
          routing="path"
          signUpUrl="/signup"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-0 p-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-input hover:bg-accent",
              formButtonPrimary: "bg-orange-600 hover:bg-orange-700",
              footerActionText: "text-gray-600 dark:text-gray-300",
              footerActionLink: "text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
            }
          }}
        />

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>

    <Button
      asChild
      variant="ghost"
      className="mt-8 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
    >
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  </div>
  )
}

