/**
 * Integration tests for partners webhook API endpoint
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock Next.js cache functions
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn().mockResolvedValue(undefined),
  revalidateTag: vi.fn().mockResolvedValue(undefined),
}));

// Mock logger
vi.mock('@/lib/webhooks/logger', () => ({
  webhookLogger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
  logWebhookReceived: vi.fn(),
  logAuthenticationFailure: vi.fn(),
  logValidationError: vi.fn(),
  logRevalidationComplete: vi.fn(),
}));

describe('POST /api/webhooks/partners', () => {
  beforeEach(() => {
    process.env.WEBHOOK_SECRET = 'test-secret-12345678';
    vi.clearAllMocks();
  });

  it('should return 401 for missing auth header', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      body: JSON.stringify({
        event: 'partner',
        action: 'created',
        partnerId: 'partner-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 401 for invalid token', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer wrong-token',
      },
      body: JSON.stringify({
        event: 'partner',
        action: 'created',
        partnerId: 'partner-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: 'invalid json {',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
    expect(data.message).toContain('JSON');
  });

  it('should return 400 for missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'partner',
        // Missing action, partnerId, timestamp
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 400 for invalid action', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'partner',
        action: 'invalid-action',
        partnerId: 'partner-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 200 for valid created webhook', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'partner',
        action: 'created',
        partnerId: 'partner-new',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.action).toBe('created');
    expect(data.data.revalidatedPaths).toBeDefined();
    expect(data.data.revalidatedPaths).toContain('/about-us');
    expect(data.data.revalidatedPaths).toContain('/');
  });

  it('should return 200 for valid updated webhook', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'partner',
        action: 'updated',
        partnerId: 'partner-existing',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.action).toBe('updated');
    expect(data.data.revalidatedPaths).toContain('/about-us');
    expect(data.data.revalidatedPaths).toContain('/');
  });

  it('should return 200 for valid deleted webhook', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/partners', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'partner',
        action: 'deleted',
        partnerId: 'partner-deleted',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.action).toBe('deleted');
    expect(data.data.revalidatedPaths).toContain('/about-us');
    expect(data.data.revalidatedPaths).toContain('/');
  });
});
