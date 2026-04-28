/**
 * Webhook configuration constants
 */

import { RevalidationPathMap } from './types';

/**
 * Webhook endpoint paths
 */
export const WEBHOOK_PATHS = {
  articles: '/api/webhooks/articles',
  partners: '/api/webhooks/partners',
  awards: '/api/webhooks/awards',
  images: '/api/webhooks/images',
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
 * Path revalidation mapping for partner updates
 */
export const PARTNER_REVALIDATION_PATHS: RevalidationPathMap = {
  created: ['/about-us', '/'], // Refresh about-us page and home page
  updated: (_partnerId: string) => ['/about-us', '/'], // Partner pages
  deleted: ['/about-us', '/'], // Refresh about-us page and home page
} as const;

/**
 * Path revalidation mapping for award updates
 */
export const AWARDS_REVALIDATION_PATHS: RevalidationPathMap = {
  created: ['/about-us', '/'], // Refresh about-us page and home page
  updated: (_awardId: string) => ['/about-us', '/'], // Award pages
  deleted: ['/about-us', '/'], // Refresh about-us page and home page
} as const;

/**
 * Path revalidation mapping for section images
 * Maps imageType to pages that display it
 */
export const IMAGES_REVALIDATION_PATHS: Record<string, string[]> = {
  hero: ['/', '/about-us'], // Hero appears on home and about pages
  'about-section': ['/about-us'], // About section image
  'what-we-do-section': ['/about-us'], // What we do section image
  'who-we-are-section': ['/', '/about-us'], // Who we are section appears on both
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
