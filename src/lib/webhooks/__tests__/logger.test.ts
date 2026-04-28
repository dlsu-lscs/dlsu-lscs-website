/**
 * Unit tests for webhook logger helpers
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  logWebhookReceived,
  logAuthenticationFailure,
  logValidationError,
  logRevalidationComplete,
} from '../logger';
import { WebhookPayload } from '../types';

describe('webhook logger helpers', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-28T00:00:00.000Z'));
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = originalNodeEnv;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('logs received webhook with resource identifiers', () => {
    const payloads: WebhookPayload[] = [
      {
        event: 'article',
        action: 'updated',
        articleId: 'article-123',
        timestamp: new Date().toISOString(),
      },
      {
        event: 'partner',
        action: 'created',
        partnerId: 'partner-123',
        timestamp: new Date().toISOString(),
      },
      {
        event: 'award',
        action: 'deleted',
        awardId: 'award-123',
        timestamp: new Date().toISOString(),
      },
      {
        event: 'image',
        action: 'updated',
        imageType: 'hero',
        timestamp: new Date().toISOString(),
      },
    ];

    for (const payload of payloads) {
      logWebhookReceived(payload);
    }

    expect(console.log).toHaveBeenCalled();

    const calls = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(
      calls.some((c) => c.includes('Webhook received') && c.includes('"event":"article"'))
    ).toBe(true);
    expect(
      calls.some((c) => c.includes('Webhook received') && c.includes('"partnerId":"partner-123"'))
    ).toBe(true);
    expect(
      calls.some((c) => c.includes('Webhook received') && c.includes('"awardId":"award-123"'))
    ).toBe(true);
    expect(
      calls.some((c) => c.includes('Webhook received') && c.includes('"imageType":"hero"'))
    ).toBe(true);
  });

  it('logs authentication and validation failures', () => {
    logAuthenticationFailure('nope');
    logValidationError('bad payload', { any: 'value' });

    const warns = vi.mocked(console.warn).mock.calls.map((c) => String(c[0]));

    expect(warns.some((c) => c.includes('Webhook authentication failed'))).toBe(true);
    expect(warns.some((c) => c.includes('Webhook validation error'))).toBe(true);
  });

  it('logs revalidation completion with paths', () => {
    const payload: WebhookPayload = {
      event: 'image',
      action: 'updated',
      imageType: 'about-section',
      timestamp: new Date().toISOString(),
    };

    logRevalidationComplete(['/about-us'], payload);

    const infos = vi.mocked(console.log).mock.calls.map((c) => String(c[0]));
    expect(
      infos.some((c) => c.includes('Revalidation complete') && c.includes('"pathCount":1'))
    ).toBe(true);
    expect(infos.some((c) => c.includes('"imageType":"about-section"'))).toBe(true);
  });
});
