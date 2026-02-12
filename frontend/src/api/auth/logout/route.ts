import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  
  // Hapus cookie dengan cara menimpanya dengan expired date
  cookieStore.delete('session_token');
  cookieStore.delete('refresh_token');

  return NextResponse.json({ success: true });
}