"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { useToast } from '@/app/_components/ui/use-toast'
import { AuthLayout } from '@/app/_components/auth/AuthLayout'
import { OAuthButtons } from '@/app/_components/auth/OAuthButtons'
import { RoleSelection } from '@/app/_components/auth/RoleSelection'
import { PasswordStrengthIndicator } from '@/app/_components/auth/PasswordStrengthIndicator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Checkbox } from '@/app/_components/ui/checkbox'
import { motion, AnimatePresence } from 'framer-motion'

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
})

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<'client' | 'contractor' | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStep(2)
  }

  async function handleRoleSubmit() {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.getValues('email'),
          password: form.getValues('password'),
          role: selectedRole,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
      }

      router.push('/dashboard')
      toast({
        title: "Account created successfully",
        description: "Welcome to Fox In The Truck!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
      setStep(1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title={step === 1 ? "Create Account" : "Choose Your Role"}
      description={step === 1 ? "Sign up for Fox In The Truck" : "Select how you'll use the platform"}
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Create a strong password"
                            type="password"
                            autoComplete="new-password"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <PasswordStrengthIndicator password={field.value} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I accept the{' '}
                            <Link
                              href="/terms"
                              className="text-orange-600 dark:text-orange-400 hover:underline"
                            >
                              terms of service
                            </Link>
                            {' '}and{' '}
                            <Link
                              href="/privacy"
                              className="text-orange-600 dark:text-orange-400 hover:underline"
                            >
                              privacy policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    Continue
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

              <OAuthButtons isLoading={isLoading} />

              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RoleSelection
              selectedRole={selectedRole}
              onSelect={setSelectedRole}
              onSubmit={handleRoleSubmit}
              isLoading={isLoading}
            />
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              Back
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}