import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]";
import { Session } from 'next-auth'; // Import the Session type

export async function POST() {
  // Ensure the session is correctly typed using the Session interface
  const session = await getServerSession(authOptions) as Session | null;

  if (!session) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  // Type assertion is not needed here since session is already typed as Session
  const user = session.user;

  return NextResponse.json({ 
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
}