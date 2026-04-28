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
 * @param data - The payload data to validate
 * @param expectedEvent - Optional expected event type (article, partner, award, image)
 */
export function validatePayload(data: unknown, expectedEvent?: string): WebhookValidationResult {
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

  if (typeof payload.timestamp !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "timestamp" field (must be string)',
    };
  }

  // Validate field values
  const supportedEvents = ['article', 'partner', 'award', 'image'];
  if (!supportedEvents.includes(payload.event)) {
    return {
      valid: false,
      error: `Invalid event type "${payload.event}". Supported: ${supportedEvents.join(', ')}`,
    };
  }

  // If expected event is specified, verify it matches
  if (expectedEvent && payload.event !== expectedEvent) {
    return {
      valid: false,
      error: `Expected event type "${expectedEvent}" but got "${payload.event}"`,
    };
  }

  const validActions: WebhookAction[] = ['created', 'updated', 'deleted'];
  if (!validActions.includes(payload.action as WebhookAction)) {
    return {
      valid: false,
      error: `Invalid action "${payload.action}". Must be one of: ${validActions.join(', ')}`,
    };
  }

  // Validate resource ID based on event type
  if (payload.event === 'article' && typeof payload.articleId !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "articleId" field (must be string)',
    };
  }

  if (payload.event === 'partner' && typeof payload.partnerId !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "partnerId" field (must be string)',
    };
  }

  if (payload.event === 'award' && typeof payload.awardId !== 'string') {
    return {
      valid: false,
      error: 'Missing or invalid "awardId" field (must be string)',
    };
  }

  if (payload.event === 'image') {
    if (typeof payload.imageType !== 'string') {
      return {
        valid: false,
        error: 'Missing or invalid "imageType" field (must be string)',
      };
    }

    const validImageTypes = ['hero', 'about-section', 'what-we-do-section', 'who-we-are-section'];
    if (!validImageTypes.includes(payload.imageType)) {
      return {
        valid: false,
        error: `Invalid imageType "${payload.imageType}". Must be one of: ${validImageTypes.join(', ')}`,
      };
    }
  }

  // Validate timestamp is a valid date
  const parsedDate = new Date(payload.timestamp as string);
  if (Number.isNaN(parsedDate.getTime())) {
    return {
      valid: false,
      error: 'Invalid timestamp format (must be ISO 8601)',
    };
  }

  const basePayload = {
    event: payload.event as WebhookPayload['event'],
    action: payload.action as WebhookAction,
    timestamp: payload.timestamp as string,
    cms: payload.cms ? String(payload.cms) : undefined,
  };

  // Validate non-empty identifier and build the validated payload
  let validatedPayload: WebhookPayload;

  switch (basePayload.event) {
    case 'article': {
      const articleId = payload.articleId as string;

      if (articleId.trim().length === 0) {
        return {
          valid: false,
          error: 'articleId must not be empty',
        };
      }

      validatedPayload = {
        ...basePayload,
        articleId,
      };

      break;
    }

    case 'partner': {
      const partnerId = payload.partnerId as string;

      if (partnerId.trim().length === 0) {
        return {
          valid: false,
          error: 'partnerId must not be empty',
        };
      }

      validatedPayload = {
        ...basePayload,
        partnerId,
      };

      break;
    }

    case 'award': {
      const awardId = payload.awardId as string;

      if (awardId.trim().length === 0) {
        return {
          valid: false,
          error: 'awardId must not be empty',
        };
      }

      validatedPayload = {
        ...basePayload,
        awardId,
      };

      break;
    }

    case 'image': {
      const imageType = payload.imageType as WebhookPayload['imageType'];

      if (!imageType || imageType.trim().length === 0) {
        return {
          valid: false,
          error: 'imageType must not be empty',
        };
      }

      validatedPayload = {
        ...basePayload,
        imageType,
      };

      break;
    }

    default: {
      const _exhaustive: never = basePayload.event;
      return {
        valid: false,
        error: `Invalid event type "${String(_exhaustive)}"`,
      };
    }
  }

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
