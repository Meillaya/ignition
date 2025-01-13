import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ 
    message: 'This endpoint is not used directly - authentication is handled by NextAuth' 
  }, { status: 200 });
}