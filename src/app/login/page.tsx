import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { AuthLayout } from '@/app/_components/AuthLayout'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from "@/server/auth"
import { api, HydrateClient } from "@/trpc/server";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export default async function LoginPage() {
  const router = useRouter()
  const session = await auth();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your Fox In The Truck account"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* <OAuthButtons isLoading={isLoading} /> */}

            <div className="text-center space-y-2">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
              >
                Forgot your password?
              </Link>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  )
}