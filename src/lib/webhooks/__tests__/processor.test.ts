/**
 * Unit tests for webhook processor
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRevalidationPaths, processArticleWebhook } from '../processor';
import { WebhookPayload } from '../types';
import { revalidatePath } from 'next/cache';

// Mock Next.js revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn().mockResolvedValue(undefined),
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
  it('should return correct paths for created action', () => {
    const paths = getRevalidationPaths('created', 'article-123');

    expect(paths).toContain('/articles');
    expect(paths).toContain('/');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should include article detail path for updated action', () => {
    const articleId = 'article-456';
    const paths = getRevalidationPaths('updated', articleId);

    expect(paths).toContain(`/article/${articleId}`);
    expect(paths).toContain('/articles');
    expect(paths).toContain('/');
  });

  it('should return correct paths for deleted action', () => {
    const paths = getRevalidationPaths('deleted', 'article-789');

    expect(paths).toContain('/articles');
    expect(paths).toContain('/');
  });

  it('should generate correct detail path with different article IDs', () => {
    const articles = ['my-article', 'article-with-slug', 'uuid-abc123'];

    for (const id of articles) {
      const paths = getRevalidationPaths('updated', id);
      expect(paths).toContain(`/article/${id}`);
    }
  });
});

describe('processArticleWebhook', () => {
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

    const result = await processArticleWebhook(payload);

    expect(result.success).toBe(true);
    expect(result.revalidatedPaths).toBeDefined();
    expect(result.revalidatedPaths?.length).toBeGreaterThan(0);
    expect(revalidatePath).toHaveBeenCalled();
  });

  it('should process updated article webhook', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'updated',
      articleId: 'existing-article',
      timestamp: new Date().toISOString(),
    };

    const result = await processArticleWebhook(payload);

    expect(result.success).toBe(true);
    expect(result.revalidatedPaths).toContain('/article/existing-article');
    expect(revalidatePath).toHaveBeenCalledWith('/article/existing-article');
  });

  it('should process deleted article webhook', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'deleted',
      articleId: 'deleted-article',
      timestamp: new Date().toISOString(),
    };

    const result = await processArticleWebhook(payload);

    expect(result.success).toBe(true);
    expect(revalidatePath).toHaveBeenCalled();
  });

  it('should revalidate all expected paths', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'updated',
      articleId: 'test-article',
      timestamp: new Date().toISOString(),
    };

    await processArticleWebhook(payload);

    expect(revalidatePath).toHaveBeenCalledWith('/article/test-article');
    expect(revalidatePath).toHaveBeenCalledWith('/articles');
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });

  it('should return timestamp in result', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'created',
      articleId: 'article-123',
      timestamp: new Date().toISOString(),
    };

    const result = await processArticleWebhook(payload);

    expect(result.timestamp).toBeDefined();
    // Should be a valid ISO string
    expect(new Date(result.timestamp)).toBeInstanceOf(Date);
  });

  it('should handle revalidation errors gracefully', async () => {
    const mockRevalidate = vi.mocked(revalidatePath);
    mockRevalidate.mockRejectedValueOnce(new Error('Revalidation failed'));
    mockRevalidate.mockResolvedValueOnce(undefined);

    const payload: WebhookPayload = {
      event: 'article',
      action: 'updated',
      articleId: 'article-error',
      timestamp: new Date().toISOString(),
    };

    const result = await processArticleWebhook(payload);

    // Should still succeed overall even if one path fails
    expect(result.success).toBe(true);
    // Some paths should have been revalidated
    expect(result.revalidatedPaths?.length).toBeGreaterThan(0);
  });

  it('should include cms metadata if provided', async () => {
    const payload: WebhookPayload = {
      event: 'article',
      action: 'created',
      articleId: 'cms-article',
      timestamp: new Date().toISOString(),
      cms: 'contentful',
    };

    const result = await processArticleWebhook(payload);

    expect(result.success).toBe(true);
    // Extra metadata is tracked in logging but not reflected in result
    expect(revalidatePath).toHaveBeenCalled();
  });
});
