/**
 * Webhook processing and revalidation
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { WebhookPayload, WebhookProcessingResult, WebhookAction } from './types';
import { ARTICLE_REVALIDATION_PATHS } from './config';
import { webhookLogger } from './logger';

/**
 * Get paths to revalidate based on article action
 */
export function getRevalidationPaths(action: WebhookAction, articleId: string): string[] {
  const pathMap = ARTICLE_REVALIDATION_PATHS;

  switch (action) {
    case 'created':
      return pathMap.created;

    case 'updated':
      return pathMap.updated(articleId);

    case 'deleted':
      return pathMap.deleted;

    default:
      // Type safety: this should never happen with proper validation
      const _exhaustive: never = action;
      return []; // Fallback for typescript exhaustiveness check
  }
}

/**
 * Execute revalidation for given paths
 */
async function executeRevalidation(paths: string[]): Promise<string[]> {
  const successfulPaths: string[] = [];
  const failedPaths: Array<{ path: string; error: string }> = [];

  for (const path of paths) {
    try {
      await revalidatePath(path);
      successfulPaths.push(path);
    } catch (error) {
      failedPaths.push({
        path,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Also revalidate the articles tag to clear ISR data cache
  try {
    await revalidateTag('articles', 'max');
    successfulPaths.push('tag:articles');
  } catch (error) {
    failedPaths.push({
      path: 'tag:articles',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Log failures if any
  if (failedPaths.length > 0) {
    webhookLogger.error('Revalidation failures', {
      failedPaths,
    });
  }

  return successfulPaths;
}

/**
 * Process article webhook event
 */
export async function processArticleWebhook(
  payload: WebhookPayload
): Promise<WebhookProcessingResult> {
  const { action, articleId, timestamp: payloadTimestamp } = payload;

  try {
    // Get paths to revalidate
    const pathsToRevalidate = getRevalidationPaths(action, articleId);

    webhookLogger.info('Processing webhook', {
      action,
      articleId,
      pathCount: pathsToRevalidate.length,
      paths: pathsToRevalidate,
    });

    // Execute revalidation
    const revalidatedPaths = await executeRevalidation(pathsToRevalidate);

    webhookLogger.info('Webhook processed successfully', {
      action,
      articleId,
      revalidatedPathCount: revalidatedPaths.length,
      revalidatedPaths,
    });

    return {
      success: true,
      revalidatedPaths,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    webhookLogger.error('Webhook processing failed', {
      action,
      articleId,
      error: errorMessage,
    });

    return {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Validate and process webhook payload
 */
export async function processWebhookPayload(
  payload: WebhookPayload
): Promise<WebhookProcessingResult> {
  if (payload.event !== 'article') {
    throw new Error(`Unsupported event type: ${payload.event}`);
  }

  return processArticleWebhook(payload);
}
