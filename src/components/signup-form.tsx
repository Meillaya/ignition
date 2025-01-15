"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/button'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { signIn } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import { supabase } from '@/lib/supabaseClient';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
  confirmPassword: z.string(),
  role: z.enum(['client', 'contractor'], { required_error: "Please select a role" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
    },
  })


  async function onSignUp(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      // Automatically log in after signup using Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Login failed after signup');
      }

      // Create NextAuth session
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        id: authData.user.id,
        role: values.role,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to unified dashboard
      router.push('/dashboard');
      router.refresh();

      toast({
        title: "Account created successfully",
        description: "Redirecting to your dashboard...",
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
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
                  type="password" 
                  placeholder="Create a password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Confirm your password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full hover:bg-primary/90 transition-colors" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="social-buttons-container">
        <button
          type="button"
          className="social-login-btn google-btn"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          disabled={isLoading}
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
        </button>

        <button
          type="button"
          className="social-login-btn apple-btn"
          onClick={() => signIn('apple', { callbackUrl: '/dashboard' })}
          disabled={isLoading}
        >
          <Image
            src="/apple.svg"
            alt="Apple logo"
            width={20}
            height={20}
          />
        </button>
      </div>
    </Form>
  )
}
