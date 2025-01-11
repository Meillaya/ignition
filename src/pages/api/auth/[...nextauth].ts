import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getXataClient } from '@/xata';
import { drizzle } from 'drizzle-orm/xata-http';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { DefaultSession, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

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
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
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

          const xata = getXataClient();
          const db = drizzle(xata);
          
          const users = await db.select()
            .from(usersTable)
            .where(eq(usersTable.email, credentials.email))
            .limit(1);

          if (users.length === 0) {
            console.error('User not found:', credentials.email);
            throw new Error("User not found");
          }

          const user = users[0];
          if (!user.password) {
            console.error('Invalid user configuration:', user.id);
            throw new Error("Invalid user configuration");
          }
          
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.error('Invalid password for user:', user.id);
            throw new Error("Invalid password");
          }

          // Type assertion is safe here because we've already validated the role
          const validRole = user.role as 'client' | 'contractor';

          return { 
            id: user.id.toString(),
            email: user.email, 
            role: validRole,
            name: user.name,
            age: user.age
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
    }
  }
});
