import { describe, expect, it, beforeEach } from 'vitest';
import { createMockRequest, verifyJsonResponse } from '@/lib/test/api-utils';
import { mockSignInSuccess, mockAuthFailure } from '@/lib/test/auth-utils';
import { POST } from './route';

describe('Auth Sign In API', () => {
  const validCredentials = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    mockSignInSuccess();
  });

  it('should sign in with valid credentials', async () => {
    const request = createMockRequest('POST', validCredentials);
    const response = await POST(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: true,
      message: 'Signed in successfully',
    });
  });

  it('should return error with invalid credentials', async () => {
    mockAuthFailure('Invalid credentials');
    const request = createMockRequest('POST', validCredentials);
    const response = await POST(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: false,
      error: 'Invalid credentials',
    });
  });

  it('should validate required fields', async () => {
    const request = createMockRequest('POST', { email: 'test@example.com' });
    const response = await POST(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: false,
      error: 'Password is required',
    });
  });
});