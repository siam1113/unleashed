import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const userid = request.cookies.get('userId')
  console.log(userid)

  // // If the user is already logged in, redirect to the profile page
  // if (request.nextUrl.pathname.startsWith('/login') && userid) {
  //   return NextResponse.redirect(new URL('/profile', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/profile') && !userid) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/find') && !userid) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:path*', '/login', '/find/:path*'],
}