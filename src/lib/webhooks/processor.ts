/**
 * Webhook processing and revalidation
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { WebhookPayload, WebhookProcessingResult } from './types';
import {
  ARTICLE_REVALIDATION_PATHS,
  PARTNER_REVALIDATION_PATHS,
  AWARDS_REVALIDATION_PATHS,
  IMAGES_REVALIDATION_PATHS,
} from './config';
import { webhookLogger } from './logger';

/**
 * Get paths to revalidate based on event type and action
 */
export function getRevalidationPaths(payload: WebhookPayload): string[] {
  const { event, action } = payload;

  switch (event) {
    case 'article': {
      const revalidationMap = ARTICLE_REVALIDATION_PATHS;
      const paths =
        action === 'updated'
          ? typeof revalidationMap.updated === 'function'
            ? revalidationMap.updated(payload.articleId || '')
            : revalidationMap.updated
          : action === 'created'
            ? revalidationMap.created
            : revalidationMap.deleted;
      return paths;
    }

    case 'partner': {
      const revalidationMap = PARTNER_REVALIDATION_PATHS;
      const paths =
        action === 'updated'
          ? typeof revalidationMap.updated === 'function'
            ? revalidationMap.updated(payload.partnerId || '')
            : revalidationMap.updated
          : action === 'created'
            ? revalidationMap.created
            : revalidationMap.deleted;
      return paths;
    }

    case 'award': {
      const revalidationMap = AWARDS_REVALIDATION_PATHS;
      const paths =
        action === 'updated'
          ? typeof revalidationMap.updated === 'function'
            ? revalidationMap.updated(payload.awardId || '')
            : revalidationMap.updated
          : action === 'created'
            ? revalidationMap.created
            : revalidationMap.deleted;
      return paths;
    }

    case 'image': {
      // For images, use imageType to determine paths
      const imageType = payload.imageType || '';
      return IMAGES_REVALIDATION_PATHS[imageType] || [];
    }

    default: {
      const _exhaustive: never = event;
      return [];
    }
  }
}

/**
 * Execute revalidation for given paths
 */
async function executeRevalidation(paths: string[], options?: { includeArticlesTag?: boolean }) {
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

  if (options?.includeArticlesTag) {
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
 * Validate and process webhook payload
 */
export async function processWebhookPayload(
  payload: WebhookPayload
): Promise<WebhookProcessingResult> {
  const { event, action } = payload;

  try {
    // Get paths to revalidate based on event type
    const pathsToRevalidate = getRevalidationPaths(payload);

    // Log context based on event type
    const eventContext =
      event === 'article'
        ? { articleId: payload.articleId }
        : event === 'partner'
          ? { partnerId: payload.partnerId }
          : event === 'award'
            ? { awardId: payload.awardId }
            : event === 'image'
              ? { imageType: payload.imageType }
              : {};

    webhookLogger.info('Processing webhook', {
      event,
      action,
      pathCount: pathsToRevalidate.length,
      paths: pathsToRevalidate,
      ...eventContext,
    });

    // Execute revalidation
    const revalidatedPaths = await executeRevalidation(pathsToRevalidate, {
      includeArticlesTag: event === 'article',
    });

    webhookLogger.info('Webhook processed successfully', {
      event,
      action,
      revalidatedPathCount: revalidatedPaths.length,
      revalidatedPaths,
      ...eventContext,
    });

    return {
      success: true,
      revalidatedPaths,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    const eventContext =
      event === 'article'
        ? { articleId: payload.articleId }
        : event === 'partner'
          ? { partnerId: payload.partnerId }
          : event === 'award'
            ? { awardId: payload.awardId }
            : event === 'image'
              ? { imageType: payload.imageType }
              : {};

    webhookLogger.error('Webhook processing failed', {
      event,
      action,
      error: errorMessage,
      ...eventContext,
    });

    return {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };
  }
}
