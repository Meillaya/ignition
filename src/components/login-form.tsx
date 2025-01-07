"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/button'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useToast } from './ui/use-toast'
import { Card } from './ui/card'
import { supabase } from '@/lib/supabaseClient';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'client' | 'contractor'>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: { email: string; password: string }) {
    setIsLoading(true)
    try {
      const {error} = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;

      setShowRoleDialog(true)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

// login-form.tsx
async function signInWithGoogle() {
  setIsLoading(true);
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw error;

    // Handle successful login (e.g., redirect or set user state)
    setShowRoleDialog(true);
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Google login failed",
      description: "Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
}

async function signInWithApple() {
  setIsLoading(true);
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });

    if (error) throw error;

    // Handle successful login (e.g., redirect or set user state)
    setShowRoleDialog(true);
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Apple login failed",
      description: "Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
}

  const handleRoleSelection = (role: 'client' | 'contractor') => {
    setSelectedRole(role)
    setShowRoleDialog(false)
    router.push(`/dashboard/${role}`)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>

      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Your Role</DialogTitle>
            <DialogDescription>
              Choose how you want to use EcoWaste today.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Card
              className={`cursor-pointer p-4 transition-colors ${
                selectedRole === 'client' ? 'border-primary' : ''
              }`}
              onClick={() => handleRoleSelection('client')}
            >
              <RadioGroup defaultValue="client">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="client" />
                  <Label htmlFor="client">Client</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-2">
                I need waste management services
              </p>
            </Card>
            <Card
              className={`cursor-pointer p-4 transition-colors ${
                selectedRole === 'contractor' ? 'border-primary' : ''
              }`}
              onClick={() => handleRoleSelection('contractor')}
            >
              <RadioGroup defaultValue="contractor">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contractor" id="contractor" />
                  <Label htmlFor="contractor">Contractor</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-2">
                I provide waste management services
              </p>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

