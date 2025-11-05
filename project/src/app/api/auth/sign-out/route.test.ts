import { describe, expect, it, beforeEach } from 'vitest';
import { createMockRequest, verifyJsonResponse } from '@/lib/test/api-utils';
import { mockSignOutSuccess, mockAuthFailure } from '@/lib/test/auth-utils';
import { POST } from './route';

describe('Auth Sign Out API', () => {
  beforeEach(() => {
    mockSignOutSuccess();
  });

  it('should sign out successfully', async () => {
    const request = createMockRequest('POST');
    const response = await POST(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: true,
      message: 'Signed out successfully',
    });
  });

  it('should handle sign out errors', async () => {
    mockAuthFailure('Session expired');
    const request = createMockRequest('POST');
    const response = await POST(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: false,
      error: 'Session expired',
    });
  });
});