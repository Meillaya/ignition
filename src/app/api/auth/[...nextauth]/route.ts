import { NextResponse } from 'next/server'
import { handleOAuthCallback } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const provider = searchParams.get('provider') as 'google' | 'apple'

  if (!code || !provider) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    const data = await handleOAuthCallback(provider, code)
    return NextResponse.json(data)
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json(
      { error: 'OAuth callback failed' },
      { status: 500 }
    )
  }
}
