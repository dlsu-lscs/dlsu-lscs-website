/**
 * Webhook types and interfaces
 */

/**
 * Supported webhook event types
 */
export type WebhookEvent = 'article';

/**
 * Supported webhook actions
 */
export type WebhookAction = 'created' | 'updated' | 'deleted';

/**
 * Webhook payload from CMS
 */
export interface WebhookPayload {
  event: WebhookEvent;
  action: WebhookAction;
  articleId: string;
  timestamp: string;
  cms?: string;
}

/**
 * Webhook validation result
 */
export interface WebhookValidationResult {
  valid: boolean;
  error?: string;
  payload?: WebhookPayload;
}

/**
 * Webhook processing result
 */
export interface WebhookProcessingResult {
  success: boolean;
  error?: string;
  revalidatedPaths?: string[];
  timestamp: string;
}

/**
 * Revalidation path mapping
 */
export interface RevalidationPathMap {
  created: string[];
  updated: (articleId: string) => string[];
  deleted: string[];
}

/**
 * Webhook error types
 */
export enum WebhookErrorType {
  InvalidPayload = 'INVALID_PAYLOAD',
  InvalidAuth = 'INVALID_AUTH',
  MissingSecret = 'MISSING_SECRET',
  ProcessingError = 'PROCESSING_ERROR',
  RevalidationError = 'REVALIDATION_ERROR',
}

/**
 * Webhook error with type information
 */
export interface WebhookError extends Error {
  type: WebhookErrorType;
  statusCode: number;
}
