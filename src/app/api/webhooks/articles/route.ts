/**
 * Webhook API endpoint for article events from CMS
 * POST /api/webhooks/articles
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  validatePayload,
  validateAuthentication,
  createWebhookError,
  isWebhookError,
} from '@/lib/webhooks/validator';
import { processWebhookPayload } from '@/lib/webhooks/processor';
import {
  webhookLogger,
  logWebhookReceived,
  logAuthenticationFailure,
  logValidationError,
} from '@/lib/webhooks/logger';
import { WebhookErrorType } from '@/lib/webhooks/types';

/**
 * Handle webhook POST requests
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication first
    const authHeader = request.headers.get('Authorization') ?? undefined;

    if (!validateAuthentication(authHeader)) {
      logAuthenticationFailure('Invalid or missing authentication header');

      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid or missing authentication header',
        },
        { status: 401 }
      );
    }

    // Parse request body
    let body: unknown;

    try {
      body = await request.json();
    } catch (error) {
      logValidationError('Failed to parse JSON body');

      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Request body must be valid JSON',
        },
        { status: 400 }
      );
    }

    // Validate payload structure
    const validationResult = validatePayload(body);

    if (!validationResult.valid) {
      logValidationError(validationResult.error || 'Unknown validation error');

      return NextResponse.json(
        {
          error: 'Bad Request',
          message: validationResult.error,
        },
        { status: 400 }
      );
    }

    const payload = validationResult.payload!;

    logWebhookReceived(payload.action, payload.articleId);

    // Process the webhook
    const processingResult = await processWebhookPayload(payload);

    if (!processingResult.success) {
      webhookLogger.error('Webhook processing failed', {
        action: payload.action,
        articleId: payload.articleId,
        error: processingResult.error,
      });

      return NextResponse.json(
        {
          error: 'Processing Error',
          message: processingResult.error,
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: `Webhook processed successfully for ${payload.action} event`,
        data: {
          action: payload.action,
          articleId: payload.articleId,
          revalidatedPaths: processingResult.revalidatedPaths,
          timestamp: processingResult.timestamp,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Unexpected error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    webhookLogger.error('Unexpected webhook error', {
      error: errorMessage,
      type: error instanceof Error ? error.constructor.name : typeof error,
    });

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred processing the webhook',
      },
      { status: 500 }
    );
  }
}

/**
 * Reject other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method Not Allowed',
      message: 'This endpoint only accepts POST requests',
    },
    { status: 405 }
  );
}
