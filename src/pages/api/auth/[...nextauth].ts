import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'client' // Default role, can be updated later
        }
      }
    }),
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

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (!user) {
      console.error('User not found:', credentials.email);
      throw new Error("User not found");
    }
    if (!user.password) {
      console.error('Invalid user configuration:', user.id);
      throw new Error("Invalid user configuration");
    }

    const isValid = await compare(credentials.password, user.password);
    if (!isValid) {
      console.error('Invalid password for user:', user.id);
      throw new Error("Invalid password");
    }

    // Ensure email is always a string
    if (!user.email) {
      console.error('Email is missing for user:', user.id);
      throw new Error("Email is missing");
    }

    // Type assertion is safe here because we've already validated the role
    const validRole = user.role as 'client' | 'contractor';

    return { 
      id: user.id.toString(),
      email: user.email, // email is now guaranteed to be a string
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
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  callbacks: {
    async jwt({ token, user }) {
      // Always try to get fresh user data
      if (token.email) {
        const { data: freshUser } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('email', token.email)
          .single();

        if (freshUser) {
          token.id = freshUser.id;
          token.role = freshUser.role;
          token.email = freshUser.email;
        }
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
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signIn({ user, account, profile }) {
      if (account?.provider !== 'credentials' && user) {
        // Handle OAuth user creation
        const { data: existingUser } = await supabase
          .from('users')
          .select('id, role')
          .eq('email', user.email)
          .single();

        if (!existingUser) {
          // Get role from additional data or default to 'client'
          const additionalData = account?.additional_data 
            ? JSON.parse(account.additional_data)
            : { role: 'client' };

          // Create new user with OAuth info
          const { error } = await supabase
            .from('users')
            .insert([{
              id: user.id,
              email: user.email,
              role: additionalData.role || 'client',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              name: profile?.name || null,
              image: profile?.picture || null
            }]);

          if (error) {
            console.error('Error creating user:', error);
            return false;
          }
        } else if (!existingUser.role) {
          // Update existing user with default role if missing
          const { error } = await supabase
            .from('users')
            .update({ role: 'client' })
            .eq('id', existingUser.id);

          if (error) {
            console.error('Error updating user role:', error);
            return false;
          }
        }
      }
      return true;
    },
  }
});
