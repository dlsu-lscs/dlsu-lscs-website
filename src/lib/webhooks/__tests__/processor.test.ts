/**
 * Unit tests for webhook processor
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRevalidationPaths, processWebhookPayload } from '../processor';
import { WebhookPayload } from '../types';
import { revalidatePath, revalidateTag } from 'next/cache';

// Mock Next.js revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn().mockResolvedValue(undefined),
  revalidateTag: vi.fn().mockResolvedValue(undefined),
}));

// Mock logger
vi.mock('../logger', () => ({
  webhookLogger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('getRevalidationPaths', () => {
  it('should return correct paths for created article', () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'created',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
    };

    const paths = getRevalidationPaths(payload);

    expect(paths).toContain('/articles');
    expect(paths).toContain('/');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should include article detail path for updated action', () => {
    const articleId = 'article-456';
    const payload: WebhookPayload = {
      event: 'article',
      action: 'updated',
      articleId,
      timestamp: new Date().toISOString(),
    };

    const paths = getRevalidationPaths(payload);

    expect(paths).toContain(`/article/${articleId}`);
    expect(paths).toContain('/articles');
    expect(paths).toContain('/');
  });

  it('should return correct paths for deleted article', () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'deleted',
      articleId: 'article-789',
      timestamp: new Date().toISOString(),
    };

    const paths = getRevalidationPaths(payload);

    expect(paths).toContain('/articles');
    expect(paths).toContain('/');
  });

  it('should handle partner payloads', () => {
    const payload: WebhookPayload = {
      event: 'partner',
      action: 'created',
      partnerId: 'partner-123',
      timestamp: new Date().toISOString(),
    };

    const paths = getRevalidationPaths(payload);

    expect(paths).toContain('/about-us');
    expect(paths).toContain('/');
  });

  it('should handle award payloads', () => {
    const payload: WebhookPayload = {
      event: 'award',
      action: 'updated',
      awardId: 'award-456',
      timestamp: new Date().toISOString(),
    };

    const paths = getRevalidationPaths(payload);

    expect(paths).toContain('/about-us');
    expect(paths).toContain('/');
  });

  it('should handle image payloads with different image types', () => {
    const imageTypes: Array<
      'hero' | 'about-section' | 'what-we-do-section' | 'who-we-are-section'
    > = ['hero', 'about-section', 'what-we-do-section', 'who-we-are-section'];

    for (const imageType of imageTypes) {
      const payload: WebhookPayload = {
        event: 'image',
        action: 'updated',
        imageType,
        timestamp: new Date().toISOString(),
      };

      const paths = getRevalidationPaths(payload);

      expect(paths.length).toBeGreaterThan(0);
    }
  });
});

describe('processWebhookPayload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process created article webhook', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'created',
      articleId: 'new-article',
      timestamp: new Date().toISOString(),
    };

    const result = await processWebhookPayload(payload);

    expect(result.success).toBe(true);
    expect(result.revalidatedPaths).toBeDefined();
    expect(result.revalidatedPaths?.length).toBeGreaterThan(0);
    expect(revalidatePath).toHaveBeenCalled();
    expect(revalidateTag).toHaveBeenCalledWith('articles', 'max');
  });

  it('should process partner webhook', async () => {
    const payload: WebhookPayload = {
      event: 'partner',
      action: 'created',
      partnerId: 'partner-123',
      timestamp: new Date().toISOString(),
    };

    const result = await processWebhookPayload(payload);

    expect(result.success).toBe(true);
    expect(result.revalidatedPaths).toBeDefined();
    expect(revalidatePath).toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should process award webhook', async () => {
    const payload: WebhookPayload = {
      event: 'award',
      action: 'updated',
      awardId: 'award-456',
      timestamp: new Date().toISOString(),
    };

    const result = await processWebhookPayload(payload);

    expect(result.success).toBe(true);
    expect(result.revalidatedPaths).toBeDefined();
    expect(revalidatePath).toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should process image webhook', async () => {
    const payload: WebhookPayload = {
      event: 'image',
      action: 'updated',
      imageType: 'hero',
      timestamp: new Date().toISOString(),
    };

    const result = await processWebhookPayload(payload);

    expect(result.success).toBe(true);
    expect(result.revalidatedPaths).toBeDefined();
    expect(revalidatePath).toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should return timestamp in result', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'created',
      articleId: 'test',
      timestamp: new Date().toISOString(),
    };

    const result = await processWebhookPayload(payload);

    expect(result.timestamp).toBeDefined();
    expect(new Date(result.timestamp).getTime()).toBeGreaterThan(0);
  });
});
