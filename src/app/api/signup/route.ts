import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['client', 'contractor']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate input
    const validatedData = signupSchema.safeParse(body);
    if (!validatedData.success) {
      console.error('Validation error:', validatedData.error);
      return NextResponse.json(
        { error: 'Invalid input data', details: validatedData.error.format() },
        { status: 400 }
      );
    }
    const { email, password, role } = validatedData.data;

    // Check if user exists
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // First create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create user in auth system');
    }

    // Then create user in users table
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        password: hashedPassword,
        role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error(insertError.message);
    }

    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user in database' },
        { status: 500 }
      );
    }

    console.log('User created successfully:', newUser.id);
    return NextResponse.json({ 
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
