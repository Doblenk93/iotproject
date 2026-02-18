import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Kirim Credential ke Backend Python
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || 'Login gagal' },
        { status: response.status }
      );
    }

    // 2. Pasang Cookie HttpOnly (User gak bisa liat/edit ini)
    const cookieStore = await cookies();
    
    // Simpan Access Token
    cookieStore.set('session_token', data.access_token, {
      httpOnly: true, // Javascript Browser gak bisa baca (Aman XSS)
      secure: process.env.NODE_ENV === 'production', // Wajib HTTPS kalau Production
      sameSite: 'strict', // Anti CSRF
      maxAge: 60 * 60 * 24, // Misal 1 Hari (Sesuaikan exp token Python)
      path: '/',
    });

    // Opsional: Simpan Refresh Token jika ada
    if (data.refresh_token) {
        cookieStore.set('refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30, // 30 Hari
            path: '/',
        });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ detail: error }, { status: 500 });
  }
}