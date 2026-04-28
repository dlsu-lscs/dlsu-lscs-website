/**
 * Webhook payload and authentication validation
 */

import {
  WebhookPayload,
  WebhookValidationResult,
  WebhookError,
  WebhookErrorType,
  WebhookAction,
} from './types';
import { BEARER_PREFIX } from './config';
import { getWebhookSecret } from '../env';

/**
 * Validate webhook payload structure
 */
export function validatePayload(data: unknown): WebhookValidationResult {
  // Check if data is an object
  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      error: 'Payload must be a JSON object',
    };
  }

  const payload = data as Record<string, unknown>;

  // Validate required fields
  if (typeof payload.event !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "event" field (must be string)',
    };
  }

  if (typeof payload.action !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "action" field (must be string)',
    };
  }

  if (typeof payload.articleId !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "articleId" field (must be string)',
    };
  }

  if (typeof payload.timestamp !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "timestamp" field (must be string)',
    };
  }

  // Validate field values
  if (payload.event !== 'article') {
    return {
      valid: false,
      error: `Invalid event type "${payload.event}". Only "article" is supported`,
    };
  }

  const validActions: WebhookAction[] = ['created', 'updated', 'deleted'];
  if (!validActions.includes(payload.action as WebhookAction)) {
    return {
      valid: false,
      error: `Invalid action "${payload.action}". Must be one of: ${validActions.join(', ')}`,
    };
  }

  // Validate timestamp is a valid date
  const parsedDate = new Date(payload.timestamp as string);
  if (Number.isNaN(parsedDate.getTime())) {
    return {
      valid: false,
      error: 'Invalid timestamp format (must be ISO 8601)',
    };
  }

  // Validate articleId is not empty
  if ((payload.articleId as string).trim().length === 0) {
    return {
      valid: false,
      error: 'articleId must not be empty',
    };
  }

  const validatedPayload: WebhookPayload = {
    event: payload.event as WebhookPayload['event'],
    action: payload.action as WebhookAction,
    articleId: payload.articleId as string,
    timestamp: payload.timestamp as string,
    cms: payload.cms ? String(payload.cms) : undefined,
  };

  return {
    valid: true,
    payload: validatedPayload,
  };
}

/**
 * Validate webhook authentication header
 */
export function validateAuthentication(authHeader: string | undefined): boolean {
  // Check if header is present
  if (!authHeader) {
    return false;
  }

  // Check bearer prefix
  if (!authHeader.startsWith(BEARER_PREFIX)) {
    return false;
  }

  // Extract token
  const token = authHeader.slice(BEARER_PREFIX.length);

  if (!token) {
    return false;
  }

  // Compare with secret
  try {
    const secret = getWebhookSecret();
    return token === secret;
  } catch {
    // Secret not configured or invalid
    return false;
  }
}

/**
 * Create a typed webhook error
 */
export function createWebhookError(
  type: WebhookErrorType,
  message: string,
  statusCode: number
): WebhookError {
  const error = new Error(message) as WebhookError;
  error.type = type;
  error.statusCode = statusCode;
  return error;
}

/**
 * Type guard for webhook error
 */
export function isWebhookError(error: unknown): error is WebhookError {
  return (
    error instanceof Error &&
    'type' in error &&
    'statusCode' in error &&
    Object.values(WebhookErrorType).includes((error as WebhookError).type)
  );
}
