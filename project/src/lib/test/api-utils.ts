import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { expect, vi } from 'vitest';

// Mock Supabase client
// Stable query builder mock returned by `from()` so tests can set responses reliably
export const mockQuery = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  upsert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  single: vi.fn(),
};

export const mockSupabaseClient = {
  from: vi.fn(() => mockQuery),
  auth: {
    getUser: vi.fn(),
    getSession: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(),
  },
};

// Helper to create mock requests
export const createMockRequest = (
  method: string, 
  body?: any, 
  url: string = 'http://localhost:3000/api/player/profile',
  options: { role?: string } = {}
) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (options.role) {
    const sessionCookie = encodeURIComponent(JSON.stringify({ role: options.role }));
    headers.set('cookie', `bt_session=${sessionCookie}`);
  }
  
  return new NextRequest(new URL(url), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
};

// Helper to verify JSON response
export const verifyJsonResponse = async (response: NextResponse) => {
  expect(response.headers.get('content-type')).toContain('application/json');
  return await response.json();
};

// Mock createClient function
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));