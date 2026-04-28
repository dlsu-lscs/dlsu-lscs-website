/**
 * Webhook API endpoint for section images events from CMS
 * POST /api/webhooks/images
 */

import { NextRequest, NextResponse } from 'next/server';
import { validatePayload, validateAuthentication } from '@/lib/webhooks/validator';
import { processWebhookPayload } from '@/lib/webhooks/processor';
import {
  webhookLogger,
  logWebhookReceived,
  logAuthenticationFailure,
  logValidationError,
} from '@/lib/webhooks/logger';

/**
 * Handle webhook POST requests for section image updates
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
    const validationResult = validatePayload(body, 'image');

    if (!validationResult.valid) {
      logValidationError(validationResult.error || 'Unknown validation error', body);

      return NextResponse.json(
        {
          error: 'Bad Request',
          message: validationResult.error,
        },
        { status: 400 }
      );
    }

    const payload = validationResult.payload!;

    logWebhookReceived(payload);

    // Process the webhook
    const processingResult = await processWebhookPayload(payload);

    if (!processingResult.success) {
      webhookLogger.error('Image webhook processing failed', {
        action: payload.action,
        imageType: payload.imageType,
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
        message: 'Section image webhook processed successfully',
        data: {
          action: payload.action,
          imageType: payload.imageType,
          revalidatedPaths: processingResult.revalidatedPaths,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    webhookLogger.error('Unexpected error in image webhook handler', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
