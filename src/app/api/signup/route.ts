import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/xata-http';
import { getXataClient } from '@/xata';
import { usersTable } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['client', 'contractor']),
});

export async function POST(request: Request) {
  const xata = getXataClient();
  const db = drizzle(xata, { schema: { usersTable } });

  try {
    const body = await request.json();
    const { email, password, role } = signupSchema.parse(body);

    // Check if user exists
    const existingUser = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const [newUser] = await db.insert(usersTable).values({
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
