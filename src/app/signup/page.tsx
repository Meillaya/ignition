import  {Metadata}  from "next";
import Link from 'next/link';
import Image from 'next/image';
import { SignupForm } from '@/components/signup-form';
import { getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]";
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Session } from 'next-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'


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
        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Sign up now to start managing your waste efficiently
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or</span>
          </div>
        </div>

 

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
          >
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>

  </div>
   
  )
}

