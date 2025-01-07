"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  email: string
  role: 'client' | 'contractor'
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string, role: 'client' | 'contractor') => Promise<void>
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

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsInitialized(true)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockUser = { id: '1', email, role: 'client' as const }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem('user')
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const signup = async (email: string, password: string, role: 'client' | 'contractor') => {
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockUser = { id: '2', email, role }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  // Don't render children until authentication is initialized
  if (!isInitialized) {
    return null // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

