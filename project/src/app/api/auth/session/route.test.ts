import { describe, expect, it, beforeEach } from 'vitest';
import { createMockRequest, verifyJsonResponse } from '@/lib/test/api-utils';
import { mockAuthSuccess, mockAuthFailure, mockSession } from '@/lib/test/auth-utils';
import { GET } from './route';

describe('Auth Session API', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockAuthSuccess();
  });

  it('should return current session when authenticated', async () => {
    const request = createMockRequest('GET');
    const response = await GET(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: true,
      data: {
        session: mockSession,
      },
    });
  });

  it('should return null session when not authenticated', async () => {
    mockAuthFailure();
    const request = createMockRequest('GET');
    const response = await GET(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: false,
      error: 'Unauthorized',
    });
  });
});