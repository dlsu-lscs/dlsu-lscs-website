/**
 * Webhook logging service with structured logs
 */

import { getEnvironmentMode, isVerboseLoggingEnabled } from '../env';

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

/**
 * Helper to log webhook event receipt
 */
export function logWebhookReceived(action: string, articleId: string): void {
  webhookLogger.info('Webhook received', { action, articleId });
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
  });
}

/**
 * Helper to log revalidation completion
 */
export function logRevalidationComplete(paths: string[], articleId: string, action: string): void {
  webhookLogger.info('Revalidation complete', {
    action,
    articleId,
    pathCount: paths.length,
    paths,
  });
}
