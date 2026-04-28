/**
 * Webhook configuration constants
 */

import { RevalidationPathMap } from './types';

/**
 * Webhook endpoint paths
 */
export const WEBHOOK_PATHS = {
  articles: '/api/webhooks/articles',
} as const;

/**
 * Path revalidation mapping based on article action
 */
export const ARTICLE_REVALIDATION_PATHS: RevalidationPathMap = {
  created: ['/articles', '/'], // Refresh article list and home page
  updated: (articleId: string) => [
    `/article/${articleId}`, // Specific article detail page
    '/articles', // Article listing page
    '/', // Home page (may display featured articles)
  ],
  deleted: ['/articles', '/'], // Refresh article list and home page
} as const;

/**
 * Request timeout for webhook processing (ms)
 */
export const WEBHOOK_REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Maximum payload size for webhook requests (bytes)
 */
export const WEBHOOK_MAX_PAYLOAD_SIZE = 1024 * 10; // 10 KB

/**
 * Webhook environment variable names
 */
export const WEBHOOK_ENV_VARS = {
  secret: 'WEBHOOK_SECRET',
} as const;

/**
 * Bearer token prefix for Authorization header
 */
export const BEARER_PREFIX = 'Bearer ';
