import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getXataClient } from '@/xata';
import { drizzle } from 'drizzle-orm/xata-http';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const xata = getXataClient();
        const db = drizzle(xata);
        
        const users = await db.select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email))
          .limit(1);

        if (users.length === 0) {
          throw new Error("User not found");
        }

        const user = users[0];
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user[0].id, email: user[0].email, role: user[0].role };
      }
    })
  ],
  session: {
    strategy: 'jwt',
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
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'client' | 'contractor';
        session.user.email = token.email as string;
      }
      return session;
    }
  }
});
