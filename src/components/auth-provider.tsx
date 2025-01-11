"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { getXataClient } from '@/xata';
import { drizzle } from 'drizzle-orm/xata-http';
import { usersTable } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

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
    const checkSession = async () => {
      try {
        console.log('Checking session status:', status);
        if (status === 'authenticated' && session?.user) {
          console.log('User authenticated:', session.user);
          setUser({
            id: session.user.id as string,
            email: session.user.email as string,
            role: session.user.role as 'client' | 'contractor'
          });
        } else if (status === 'unauthenticated') {
          console.log('No active session.');
          setUser(null);
        }
        setIsInitialized(true);
        console.log('Auth provider initialized.');
      } catch (error) {
        console.error('Session check error:', error);
        setIsInitialized(true);
      }
    };

    checkSession();
  }, [session, status]);

  const login = async (email: string, password: string): Promise<User> => {
    console.log('Attempting to log in user:', email);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
      throw new Error(result.error);
    }
    console.log('Login successful.');

    // Wait for session to update
    console.log('Waiting for session to update...');
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!session?.user) {
      console.error('Login failed - no session created.');
      throw new Error('Login failed - no session created');
    }

    console.log('Session updated successfully:', session.user);
    return {
      id: session.user.id as string,
      email: session.user.email as string,
      role: session.user.role as 'client' | 'contractor'
    }
  }

  const logout = async () => {
    console.log('Attempting to log out user...');
    await signOut({ redirect: false });
    setUser(null);
    console.log('User logged out successfully.');
    router.push('/');
  }

  const signup = async (
    email: string, 
    password: string, 
    role: 'client' | 'contractor'
  ) => {
    try {
      console.log('Starting signup process...');
      const xata = getXataClient();
      const db = drizzle(xata);
      
      // Check if user already exists
      const existingUser = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await hash(password, 12);

      // Create user in database
      const [newUser] = await db.insert(usersTable).values({
        email,
        password: hashedPassword,
        role,
      }).returning();

      if (!newUser) {
        throw new Error('Failed to create user');
      }

      // Automatically log in the new user
      console.log('Attempting to log in new user...');
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('SignIn Error:', result.error);
        throw new Error(result.error);
      }
      console.log('User login successful.');

      // Wait for session to update
      console.log('Waiting for session to update...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect based on role
      console.log('Redirecting user based on role:', role);
      if (role === 'client') {
        router.push('/dashboard/client');
      } else {
        router.push('/dashboard/contractor');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
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
