/**
 * Webhook logging service with structured logs
 */

import { getEnvironmentMode, isVerboseLoggingEnabled } from '../env';
import { WebhookPayload } from './types';

/**
 * Log level
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Structured log entry
 */
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  environment: string;
}

/**
 * Create a formatted log message without exposing sensitive data
 */
function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, context, environment } = entry;
  const contextString = context ? JSON.stringify(context) : '';

  return `[${timestamp}] [${level.toUpperCase()}] [${environment}] ${message}${
    contextString ? ` | ${contextString}` : ''
  }`;
}

/**
 * Write log to appropriate destination
 */
function writeLog(entry: LogEntry): void {
  const formatted = formatLogEntry(entry);

  // In production, logs would be sent to logging service
  // For now, use console which can be captured by monitoring tools
  switch (entry.level) {
    case 'debug':
    case 'info':
      console.log(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'error':
      console.error(formatted);
      break;
  }
}

/**
 * Create a log entry and write it
 */
function log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  // Only log debug messages if verbose logging is enabled
  if (level === 'debug' && !isVerboseLoggingEnabled()) {
    return;
  }

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    environment: getEnvironmentMode(),
  };

  writeLog(entry);
}

/**
 * Webhook logger instance
 */
export const webhookLogger = {
  debug: (message: string, context?: Record<string, unknown>) => log('debug', message, context),

  info: (message: string, context?: Record<string, unknown>) => log('info', message, context),

  warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),

  error: (message: string, context?: Record<string, unknown>) => log('error', message, context),
} as const;

function sanitizeWebhookPayloadForLog(payload: unknown): Record<string, unknown> | undefined {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const data = payload as Record<string, unknown>;

  const sanitized: Record<string, unknown> = {
    event: typeof data.event === 'string' ? data.event : undefined,
    action: typeof data.action === 'string' ? data.action : undefined,
    timestamp: typeof data.timestamp === 'string' ? data.timestamp : undefined,
    cms: typeof data.cms === 'string' ? data.cms : undefined,
  };

  if (typeof data.articleId === 'string') sanitized.articleId = data.articleId;
  if (typeof data.partnerId === 'string') sanitized.partnerId = data.partnerId;
  if (typeof data.awardId === 'string') sanitized.awardId = data.awardId;
  if (typeof data.imageType === 'string') sanitized.imageType = data.imageType;

  return sanitized;
}

function buildWebhookResourceContext(payload: WebhookPayload): Record<string, unknown> {
  switch (payload.event) {
    case 'article':
      return { articleId: payload.articleId };
    case 'partner':
      return { partnerId: payload.partnerId };
    case 'award':
      return { awardId: payload.awardId };
    case 'image':
      return { imageType: payload.imageType };
    default: {
      const _exhaustive: never = payload.event;
      return {};
    }
  }
}

/**
 * Helper to log webhook event receipt
 */
export function logWebhookReceived(payload: WebhookPayload): void {
  webhookLogger.info('Webhook received', {
    event: payload.event,
    action: payload.action,
    timestamp: payload.timestamp,
    cms: payload.cms,
    ...buildWebhookResourceContext(payload),
  });
}

/**
 * Helper to log authentication failure
 */
export function logAuthenticationFailure(reason: string): void {
  webhookLogger.warn('Webhook authentication failed', { reason });
}

/**
 * Helper to log validation error
 */
export function logValidationError(error: string, payload?: unknown): void {
  webhookLogger.warn('Webhook validation error', {
    error,
    // Include payload structure for debugging, but sanitize sensitive fields
    hasPayload: Boolean(payload),
    payload: sanitizeWebhookPayloadForLog(payload),
  });
}

/**
 * Helper to log revalidation completion
 */
export function logRevalidationComplete(paths: string[], payload: WebhookPayload): void {
  webhookLogger.info('Revalidation complete', {
    event: payload.event,
    action: payload.action,
    ...buildWebhookResourceContext(payload),
    pathCount: paths.length,
    paths,
  });
}
