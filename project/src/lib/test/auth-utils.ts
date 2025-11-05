import { vi } from 'vitest';
import { mockSupabaseClient } from './api-utils';

// Mock user session data
export const mockSession = {
  access_token: 'mock-token',
  refresh_token: 'mock-refresh',
  expires_in: 3600,
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    role: 'player',
  },
};

// Helper to mock successful auth
export const mockAuthSuccess = () => {
  mockSupabaseClient.auth.getSession.mockResolvedValue({
    data: { session: mockSession },
    error: null,
  });
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: mockSession.user },
    error: null,
  });
};

// Helper to mock auth failure
export const mockAuthFailure = (errorMessage: string = 'Unauthorized') => {
  mockSupabaseClient.auth.getSession.mockResolvedValue({
    data: { session: null },
    error: { message: errorMessage },
  });
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: { message: errorMessage },
  });
};

// Helper to mock sign in
export const mockSignInSuccess = () => {
  mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
    data: { session: mockSession },
    error: null,
  });
};

// Helper to mock sign out
export const mockSignOutSuccess = () => {
  mockSupabaseClient.auth.signOut.mockResolvedValue({
    error: null,
  });
};

// Helper to setup auth state change listener
export const setupAuthListener = () => {
  const listeners = new Set<(event: { event: string; session: any }) => void>();
  
  mockSupabaseClient.auth.onAuthStateChange.mockImplementation((callback) => {
    listeners.add(callback);
    return {
      data: { subscription: { unsubscribe: () => listeners.delete(callback) } },
    };
  });

  return {
    // Simulate auth state change
    emitAuthChange: (event: 'SIGNED_IN' | 'SIGNED_OUT', session: any = null) => {
      listeners.forEach(callback => callback({ event, session }));
    },
  };
};