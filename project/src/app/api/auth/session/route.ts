import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { data: { session }, error } = await supabaseServer.auth.getSession();

  if (error || !session) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Unauthorized',
    });
  }

  return NextResponse.json({
    success: true,
    data: {
      session,
    },
  });
}