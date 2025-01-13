import  Metadata  from "next";
import Link from 'next/link';
import Image from 'next/image';
import { SignupForm } from '@/components/signup-form';
import { getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]";
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { configureOAuth } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';
import { Session } from 'next-auth';

export const metadata: Metadata = {
  title: 'Sign Up - Fox In The Truck',
  description: 'Create your Fox In The Truck account',
}

export default async function SignupPage() {
  const session: Session | null = await getServerSession(authOptions);
  
  if (session && session.user) {
    redirect('/dashboard');
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
              <h1 className="text-4xl font-extrabold">Join Fox In The Truck Today</h1>
              <p className="text-xl">
                Create your account and start managing your construction waste efficiently and sustainably.
              </p>
              <div className="h-1 w-20 bg-white rounded" />
              <blockquote className="text-lg italic">
                "Signing up with Fox In The Truck was the best decision for our waste management needs. 
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up now to start managing your waste efficiently
              </p>
            </div>

            <SignupForm />

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/login"
                className="hover:text-orange-600 dark:hover:text-orange-400 underline underline-offset-4"
              >
                Already have an account? Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
   
  )
}

