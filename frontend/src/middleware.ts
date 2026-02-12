import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Cek keberadaan cookie 'session_token'
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Proteksi Route Dashboard
  if (pathname.startsWith('/app')) {
    if (!token) {
      // Kalau gak ada token, tendang ke login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Redirect User Login ke Dashboard (jika sudah login)
  if (pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/app', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/login/:path*'],
};