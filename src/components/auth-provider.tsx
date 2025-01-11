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
        id: session.user.id,
        email: session.user.email,
        role: session.user.role as 'client' | 'contractor'
      })
    } else {
      setUser(null)
    }
    setIsInitialized(true)
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

    return {
      id: session?.user.id || '',
      email: session?.user.email || '',
      role: session?.user.role as 'client' | 'contractor'
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
    
    const hashedPassword = await hash(password, 12);

    await db.insert(usersTable).values({
      name: name || email.split('@')[0],
      age: age || 0,
      email,
      password: hashedPassword,
      role,
    })

    await login(email, password)
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
