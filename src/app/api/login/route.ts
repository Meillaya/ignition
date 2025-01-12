import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/xata-http';
import { getXataClient } from '@/xata';
import { usersTable } from '@/db/schema';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const xata = getXataClient();
  const db = drizzle(xata, { schema: { usersTable } });

  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Verify user exists
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return success - NextAuth will handle session creation
    return NextResponse.json({ 
      success: true,
      redirectUrl: '/dashboard'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
