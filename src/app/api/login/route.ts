import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This endpoint is not used - authentication is handled by NextAuth' 
  }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'This endpoint is not used - authentication is handled by NextAuth' 
  }, { status: 200 });
}
