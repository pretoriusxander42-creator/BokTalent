import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = signInSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({
        success: false,
        error: validated.error.issues[0].message,
      });
    }

    const { email, password } = validated.data;
    const { error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Signed in successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Invalid request format',
    });
  }
}