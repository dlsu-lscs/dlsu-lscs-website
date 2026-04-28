/**
 * Environment variable types and validation
 */

/**
 * Get and validate webhook secret from environment
 */
export function getWebhookSecret(): string {
  const secret = process.env.WEBHOOK_SECRET;

  if (!secret) {
    throw new Error(
      'WEBHOOK_SECRET environment variable is not set. ' +
        'Please set it for webhook authentication to work properly.'
    );
  }

  if (secret.length < 8) {
    throw new Error('WEBHOOK_SECRET must be at least 8 characters long for security.');
  }

  return secret;
}

/**
 * Check if webhook secret is configured
 */
export function isWebhookSecretConfigured(): boolean {
  return Boolean(process.env.WEBHOOK_SECRET);
}

/**
 * Environment mode (development or production)
 */
export function getEnvironmentMode(): 'development' | 'production' {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

/**
 * Whether to enable verbose logging
 */
export function isVerboseLoggingEnabled(): boolean {
  return process.env.WEBHOOK_VERBOSE_LOGGING === 'true';
}
