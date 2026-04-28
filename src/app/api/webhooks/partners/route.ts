/**
 * Webhook API endpoint for partner events from CMS
 * POST /api/webhooks/partners
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
 * Handle webhook POST requests for partner updates
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
    const validationResult = validatePayload(body, 'partner');

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
      webhookLogger.error('Partner webhook processing failed', {
        action: payload.action,
        partnerId: payload.partnerId,
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
        message: 'Partner webhook processed successfully',
        data: {
          action: payload.action,
          revalidatedPaths: processingResult.revalidatedPaths,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    webhookLogger.error('Unexpected error in partner webhook handler', {
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
