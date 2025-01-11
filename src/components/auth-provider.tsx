"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { getXataClient } from '@/xata';
import { drizzle } from 'drizzle-orm/xata-http';
import { usersTable } from '@/db/schema';
import { hash } from 'bcryptjs';

type User = {
  id: string
  email: string
  role: 'client' | 'contractor'
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  signup: (
    email: string, 
    password: string, 
    role: 'client' | 'contractor',
    name?: string,
    age?: number
  ) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser({
        id: session.user.id as string,
        email: session.user.email as string,
        role: session.user.role as 'client' | 'contractor'
      })
    } else if (status === 'unauthenticated') {
      setUser(null)
    }
    if (status !== 'loading') {
      setIsInitialized(true)
    }
  }, [session, status])

  const login = async (email: string, password: string): Promise<User> => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error(result.error)
    }

    // Wait for session to update
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!session?.user) {
      throw new Error('Login failed - no session created');
    }

    return {
      id: session.user.id as string,
      email: session.user.email as string,
      role: session.user.role as 'client' | 'contractor'
    }
  }

  const logout = async () => {
    await signOut({ redirect: false })
    setUser(null)
    router.push('/')
  }

  const signup = async (
    email: string, 
    password: string, 
    role: 'client' | 'contractor',
    name?: string,
    age?: number
  ) => {
    const xata = getXataClient();
    const db = drizzle(xata);
    
    // Check if user already exists
    const existingUser = await db.select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 12);

    // Create user in database
    const [newUser] = await db.insert(usersTable).values({
      name: name || email.split('@')[0],
      age: age || 0,
      email,
      password: hashedPassword,
      role,
    }).returning();

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    // Automatically log in the new user
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    // Wait for session to update
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!session?.user) {
      throw new Error('Login failed - no session created');
    }

    // Redirect based on role
    if (role === 'client') {
      router.push('/dashboard/client');
    } else {
      router.push('/dashboard/contractor');
    }
  }

  if (!isInitialized) {
    return null // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
