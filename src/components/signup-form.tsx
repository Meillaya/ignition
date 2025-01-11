"use client"

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/components/auth-provider'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(['client', 'contractor'], { required_error: "Please select a role" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
})

export function SignupForm() {
  const { signup } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      age: undefined,
    },
    mode: 'onChange', // Validate on change
  })

  // Add form state logging
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log('Form field changed:', { name, type, value })
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form onSubmit triggered!');
    setIsLoading(true);
    console.log('Form submitted with values:', values);

    // Add validation check
    try {
      const result = formSchema.safeParse(values);
      if (!result.success) {
        console.error('Form data validation failed:', result.error);
        throw new Error('Invalid form data');
      }
      console.log('Attempting to create user...');
      await signup(values.email, values.password, values.role, values.name, values.age);
      console.log('User creation successful!');

      toast({
        title: "Account created successfully",
        description: "Welcome to Fox In The Truck Management!",
      });
      console.log('Toast notification shown for success.');
      
      // Force refresh to ensure session is updated
      console.log('Refreshing page...');
      window.location.href = values.role === 'client' ? '/dashboard/client' : '/dashboard/contractor';
    } catch (error) {
      console.error('Signup failed:', error);

      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "There was an error creating your account. Please try again.",
      });
      console.log('Toast notification shown for error.');
    } finally {
      setIsLoading(false);
      console.log('Signup process completed.');
    }
  }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={async (e) => {
          console.log('Form submit event triggered');
          e.preventDefault();
          
          try {
            console.log('Validating form...');
            const isValid = await form.trigger();
            if (!isValid) {
              console.error('Form validation failed');
              return;
            }
            
            console.log('Form is valid, calling onSubmit...');
            await form.handleSubmit(onSubmit)(e);
          } catch (error) {
            console.error('Form submission error:', error);
            toast({
              variant: "destructive",
              title: "Form submission failed",
              description: error instanceof Error ? error.message : "An unexpected error occurred",
            });
          }
        }} 
        className="space-y-4"
      >
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
                <Input type="password" placeholder="Create a password" {...field} />
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
      
      {/* Test button outside form */}
      <Button 
        onClick={() => console.log('Test button clicked!')}
        className="mt-4"
      >
        Test Button
      </Button>
    </Form>
  )
}

