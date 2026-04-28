/**
 * Unit tests for webhook validator
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  validatePayload,
  validateAuthentication,
  createWebhookError,
  isWebhookError,
} from '../validator';
import { WebhookErrorType } from '../types';

// Mock environment variables
beforeEach(() => {
  process.env.WEBHOOK_SECRET = 'test-secret-123456';
});

describe('validatePayload', () => {
  it('should validate a correct payload', () => {
    const payload = {
      event: 'article',
      action: 'created',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(true);
    expect(result.payload).toEqual(payload);
    expect(result.error).toBeUndefined();
  });

  it('should reject non-object payloads', () => {
    const result = validatePayload('not an object');

    expect(result.valid).toBe(false);
    expect(result.error).toContain('JSON object');
  });

  it('should reject missing event field', () => {
    const payload = {
      action: 'created',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('event');
  });

  it('should reject invalid event type', () => {
    const payload = {
      event: 'unknown',
      action: 'created',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('article');
  });

  it('should reject invalid action', () => {
    const payload = {
      event: 'article',
      action: 'invalid',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('action');
  });

  it('should validate all valid actions', () => {
    const actions = ['created', 'updated', 'deleted'];

    for (const action of actions) {
      const payload = {
        event: 'article',
        action,
        articleId: 'article-123',
        timestamp: new Date().toISOString(),
      };

      const result = validatePayload(payload);
      expect(result.valid).toBe(true);
    }
  });

  it('should reject invalid timestamp', () => {
    const payload = {
      event: 'article',
      action: 'created',
      articleId: 'article-123',
      timestamp: 'not-a-date',
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('timestamp');
  });

  it('should reject empty articleId', () => {
    const payload = {
      event: 'article',
      action: 'created',
      articleId: '   ',
      timestamp: new Date().toISOString(),
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('articleId');
  });

  it('should include optional cms field', () => {
    const payload = {
      event: 'article',
      action: 'created',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
      cms: 'our-cms',
    };

    const result = validatePayload(payload);

    expect(result.valid).toBe(true);
    expect(result.payload?.cms).toBe('our-cms');
  });
});

describe('validateAuthentication', () => {
  it('should accept valid bearer token', () => {
    const authHeader = 'Bearer test-secret-123456';
    const result = validateAuthentication(authHeader);

    expect(result).toBe(true);
  });

  it('should reject missing auth header', () => {
    const result = validateAuthentication(undefined);

    expect(result).toBe(false);
  });

  it('should reject empty auth header', () => {
    const result = validateAuthentication('');

    expect(result).toBe(false);
  });

  it('should reject missing Bearer prefix', () => {
    const authHeader = 'test-secret-123456';
    const result = validateAuthentication(authHeader);

    expect(result).toBe(false);
  });

  it('should reject invalid token', () => {
    const authHeader = 'Bearer wrong-token';
    const result = validateAuthentication(authHeader);

    expect(result).toBe(false);
  });

  it('should reject Bearer prefix without token', () => {
    const authHeader = 'Bearer ';
    const result = validateAuthentication(authHeader);

    expect(result).toBe(false);
  });

  it('should reject when secret is not configured', () => {
    delete process.env.WEBHOOK_SECRET;

    const authHeader = 'Bearer test-secret-123456';
    const result = validateAuthentication(authHeader);

    expect(result).toBe(false);
  });
});

describe('createWebhookError', () => {
  it('should create error with type and status code', () => {
    const error = createWebhookError(WebhookErrorType.InvalidPayload, 'Test error message', 400);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error message');
    expect(error.type).toBe(WebhookErrorType.InvalidPayload);
    expect(error.statusCode).toBe(400);
  });
});

describe('isWebhookError', () => {
  it('should identify webhook errors', () => {
    const error = createWebhookError(WebhookErrorType.ProcessingError, 'Processing failed', 500);

    expect(isWebhookError(error)).toBe(true);
  });

  it('should reject regular errors', () => {
    const error = new Error('Regular error');

    expect(isWebhookError(error)).toBe(false);
  });

  it('should reject non-error values', () => {
    expect(isWebhookError('not an error')).toBe(false);
    expect(isWebhookError(null)).toBe(false);
    expect(isWebhookError({})).toBe(false);
  });
});
