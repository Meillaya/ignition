"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useToast } from "@/app/_components/ui/use-toast";
import { AuthLayout } from "@/app/_components/AuthLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";


const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});
type FormSchemaType = z.infer<typeof FormSchema>;
export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    try {
      const result = await signIn("email", {
        email: values.email,
        redirect: false,
      });
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else {
        toast({
          title: "Check your email",
          description:
            "We've sent you an email with a confirmation link.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <AuthLayout
      title="Create your account"
      description="Enter your email address and we'll send you a verification link."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary underline hover:no-underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
}