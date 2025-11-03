import { describe, expect, it, beforeEach } from 'vitest';
import { createMockRequest, verifyJsonResponse } from '@/lib/test/api-utils';
import { mockAuthSuccess, mockAuthFailure } from '@/lib/test/auth-utils';
import { GET } from './route';

describe('Protected API Route', () => {
  const basePath = 'http://localhost:3000/api/player/protected';

  beforeEach(() => {
    mockAuthSuccess();
  });

  it('should allow authenticated player access', async () => {
    const request = createMockRequest('GET', undefined, basePath, { role: 'player' });
    const response = await GET(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: true,
      data: {
        message: 'Protected data',
      },
    });
  });

  it('should deny access without auth', async () => {
    mockAuthFailure();
    const request = createMockRequest('GET', undefined, basePath);
    const response = await GET(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: false,
      error: 'Unauthorized',
    });
  });

  it('should deny access with wrong role', async () => {
    const request = createMockRequest('GET', undefined, basePath, { role: 'scout' });
    const response = await GET(request);
    const json = await verifyJsonResponse(response);
    
    expect(json).toEqual({
      success: false,
      error: 'Unauthorized - Invalid role',
    });
  });
});