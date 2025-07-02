// middleware.ts
import { NextResponse } from 'next/server'
import { jwtVerify, JWTPayload } from 'jose'

// Pre‑encode your secret once:
const SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET)

export async function middleware(request) {
  console.log("from middleware..");
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  // Handler for /user/*
  if (pathname.startsWith('/user')) {
    if (!token) {
      console.log('No token → redirect to /login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      // Throws if invalid/expired
      const { payload } = await jwtVerify(token, SECRET)
      console.log('JWT payload:', payload)
      return NextResponse.next()
    } catch (err) {
      console.error('JWT verification failed:', err)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Handler for /teacher/*
  if (pathname.startsWith('/teacher')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      const { payload } = await jwtVerify(token, SECRET)
      console.log(payload);
      const roles = (payload).roles || []
      if (roles.includes('teacher') || roles.includes('principal')) {
        return NextResponse.next()
      }
    } catch (err) {
      console.error('JWT verification failed:', err)
    }
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Handler for /principle/*
  if (pathname.startsWith('/principle')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      const { payload } = await jwtVerify(token, SECRET)
      console.log(payload);
      const roles = (payload).roles || []
      if (roles.includes('principle')) {
        return NextResponse.next()
      }
    } catch (err) {
      console.error('JWT verification failed:', err)
    }
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Public routes
  return NextResponse.next()
}

export const config = {
  matcher: [ '/user/:path*', '/teacher/:path*', '/principle/:path*' ],
}
