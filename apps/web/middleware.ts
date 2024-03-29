import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export default function m(request: NextRequest) {
  const userId = request.cookies.get('userId');
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}