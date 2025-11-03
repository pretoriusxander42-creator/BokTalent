import { NextRequest, NextResponse } from 'next/server';
import { getRoleFromCookie } from '@/middleware';

export async function GET(request: NextRequest) {
  const role = getRoleFromCookie(request);

  if (!role) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized',
    });
  }

  if (role !== 'player') {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized - Invalid role',
    });
  }

  return NextResponse.json({
    success: true,
    data: {
      message: 'Protected data',
    },
  });
}