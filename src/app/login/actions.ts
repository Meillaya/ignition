'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return redirect('/login?error=Could not authenticate user')
  }

  return redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  
  const { error } = await (await supabase).auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return redirect('/signup?error=Could not create user')
  }

  return redirect('/login?message=Check email to continue sign in process')
}
