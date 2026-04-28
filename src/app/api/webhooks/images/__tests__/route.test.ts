/**
 * Integration tests for images webhook API endpoint
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

describe('POST /api/webhooks/images', () => {
  beforeEach(() => {
    process.env.WEBHOOK_SECRET = 'test-secret-12345678';
    vi.clearAllMocks();
  });

  it('should return 401 for missing auth header', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
      method: 'POST',
      body: JSON.stringify({
        event: 'image',
        action: 'updated',
        imageType: 'hero',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 401 for invalid token', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer wrong-token',
      },
      body: JSON.stringify({
        event: 'image',
        action: 'updated',
        imageType: 'hero',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
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
    const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'image',
        // Missing action, imageType, timestamp
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 400 for invalid action', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'image',
        action: 'invalid-action',
        imageType: 'hero',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 400 for invalid imageType', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'image',
        action: 'updated',
        imageType: 'not-a-real-image-type',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 200 for all image types and actions', async () => {
    const imageTypes = [
      'hero',
      'about-section',
      'what-we-do-section',
      'who-we-are-section',
    ] as const;
    const actions = ['created', 'updated', 'deleted'] as const;

    const expectedPathsByType: Record<(typeof imageTypes)[number], string[]> = {
      hero: ['/', '/about-us'],
      'about-section': ['/about-us'],
      'what-we-do-section': ['/about-us'],
      'who-we-are-section': ['/', '/about-us'],
    };

    for (const imageType of imageTypes) {
      for (const action of actions) {
        const request = new NextRequest('http://localhost:3000/api/webhooks/images', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer test-secret-12345678',
          },
          body: JSON.stringify({
            event: 'image',
            action,
            imageType,
            timestamp: new Date().toISOString(),
          }),
        });

        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.success).toBe(true);
        expect(data.data.action).toBe(action);
        expect(data.data.imageType).toBe(imageType);
        expect(data.data.revalidatedPaths).toBeDefined();

        for (const expectedPath of expectedPathsByType[imageType]) {
          expect(data.data.revalidatedPaths).toContain(expectedPath);
        }
      }
    }
  });
});
