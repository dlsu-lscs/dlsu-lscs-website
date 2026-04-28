/**
 * Integration tests for webhook API endpoint
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST, GET } from '../route';
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

describe('POST /api/webhooks/articles', () => {
  beforeEach(() => {
    process.env.WEBHOOK_SECRET = 'test-secret-12345678';
    vi.clearAllMocks();
  });

  it('should return 401 for missing auth header', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      body: JSON.stringify({
        event: 'article',
        action: 'created',
        articleId: 'test-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 401 for invalid token', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer wrong-token',
      },
      body: JSON.stringify({
        event: 'article',
        action: 'created',
        articleId: 'test-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
  });

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
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
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'article',
        // Missing action, articleId, timestamp
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 400 for invalid action', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'article',
        action: 'invalid-action',
        articleId: 'test-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Bad Request');
  });

  it('should return 200 for valid created webhook', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'article',
        action: 'created',
        articleId: 'new-article-123',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.action).toBe('created');
    expect(data.data.articleId).toBe('new-article-123');
    expect(data.data.revalidatedPaths).toBeDefined();
  });

  it('should return 200 for valid updated webhook', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'article',
        action: 'updated',
        articleId: 'existing-article',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.action).toBe('updated');
  });

  it('should return 200 for valid deleted webhook', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'article',
        action: 'deleted',
        articleId: 'deleted-article',
        timestamp: new Date().toISOString(),
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.action).toBe('deleted');
  });

  it('should include optional cms field in response', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-secret-12345678',
      },
      body: JSON.stringify({
        event: 'article',
        action: 'created',
        articleId: 'article-cms',
        timestamp: new Date().toISOString(),
        cms: 'contentful',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('should handle revalidation with different article IDs', async () => {
    const articleIds = ['article-slug', 'uuid-123', 'my-article-2025'];

    for (const articleId of articleIds) {
      const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer test-secret-12345678',
        },
        body: JSON.stringify({
          event: 'article',
          action: 'updated',
          articleId,
          timestamp: new Date().toISOString(),
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.data.revalidatedPaths).toContain(`/article/${articleId}`);
    }
  });
});

describe('GET /api/webhooks/articles', () => {
  it('should return 405 Method Not Allowed', async () => {
    const request = new NextRequest('http://localhost:3000/api/webhooks/articles', {
      method: 'GET',
    });

    const response = await GET();

    expect(response.status).toBe(405);
    const data = await response.json();
    expect(data.error).toBe('Method Not Allowed');
  });
});
