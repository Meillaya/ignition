import NextAuth from 'next-auth';
import crypto from 'crypto';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabaseClient';
import { compare } from 'bcryptjs';
import { DefaultSession, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { getSession } from 'next-auth/react';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: 'client' | 'contractor';
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    email: string;
    role: 'client' | 'contractor';
    name?: string | null;
    age?: number | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: 'client' | 'contractor';
  }
}


export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
    error: '/login',
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NEXTAUTH_URL?.replace(/https?:\/\//, ''),
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            console.error('No credentials provided');
            return null;
          }

          // First validate email exists
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (userError || !user) {
            console.error('User not found:', credentials.email);
            throw new Error("Invalid email or password");
          }

          // Then validate password
          const { data: authData, error: authError } = await supabase
            .from('users')
            .select('password')
            .eq('email', credentials.email)
            .single();

          if (authError || !authData?.password) {
            console.error('Password validation failed:', user.id);
            throw new Error("Invalid email or password");
          }

          const isValid = await compare(credentials.password, authData.password);
          if (!isValid) {
            console.error('Invalid password for user:', user.id);
            throw new Error("Invalid email or password");
          }

          // Type assertion is safe here because we've already validated the role
          const validRole = user.role as 'client' | 'contractor';

          return { 
            id: user.id.toString(),
            email: user.email, 
            role: validRole,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      // Default redirect to home if no session
      return baseUrl;
    }
  }
});
