# Webhook Configuration Guide

## Overview

The Webhook system enables real-time content updates by allowing your CMS to notify the website when content changes. When the CMS sends a webhook event, the website automatically revalidates the affected pages through Next.js ISR (Incremental Static Regeneration).

## Endpoints

The system exposes separate webhook endpoints per content type:

```
POST https://your-domain.com/api/webhooks/articles
POST https://your-domain.com/api/webhooks/partners
POST https://your-domain.com/api/webhooks/awards
POST https://your-domain.com/api/webhooks/images
```

## Authentication

All webhook requests must include a Bearer token in the `Authorization` header.

### Header Format

```
Authorization: Bearer YOUR_WEBHOOK_SECRET
```

The `YOUR_WEBHOOK_SECRET` must match the `WEBHOOK_SECRET` environment variable configured on the website.

### Setting Up the Secret

1. Generate a secure random string (at least 20 characters recommended)
2. Set the `WEBHOOK_SECRET` environment variable on your deployment:
   - **Vercel/Netlify**: Add to environment variables in dashboard
   - **Docker/Self-hosted**: Set in `.env` or through deployment platform
3. Configure the same secret in your CMS webhook settings

**Security Notes:**

- Use a different secret for each environment (staging, production)
- Rotate secrets periodically
- Never commit secrets to version control
- Regenerate immediately if compromised

## Webhook Payload Format

The JSON payload must include the following fields:

```json
{
  "event": "article|partner|award|image",
  "action": "created|updated|deleted",
  "articleId": "article-slug-or-id",
  "partnerId": "partner-id",
  "awardId": "award-id",
  "imageType": "hero|about-section|what-we-do-section|who-we-are-section",
  "timestamp": "2025-01-20T14:30:00Z",
  "cms": "your-cms-name"
}
```

### Field Descriptions

| Field       | Type   | Required         | Description                                            |
| ----------- | ------ | ---------------- | ------------------------------------------------------ |
| `event`     | string | Yes              | One of: `"article"`, `"partner"`, `"award"`, `"image"` |
| `action`    | string | Yes              | One of: `"created"`, `"updated"`, `"deleted"`          |
| `articleId` | string | If event=article | Article identifier (slug or ID)                        |
| `partnerId` | string | If event=partner | Partner identifier                                     |
| `awardId`   | string | If event=award   | Award identifier                                       |
| `imageType` | string | If event=image   | Image slot identifier                                  |
| `timestamp` | string | Yes              | ISO 8601 formatted timestamp                           |
| `cms`       | string | No               | Name of your CMS system (for logging/debugging)        |

### Validation Rules

- `event` must be exactly one of: `article`, `partner`, `award`, `image`
- `action` must be exactly one of: `created`, `updated`, `deleted`
- For `event=article`: `articleId` must not be empty
- For `event=partner`: `partnerId` must not be empty
- For `event=award`: `awardId` must not be empty
- For `event=image`: `imageType` must be one of: `hero`, `about-section`, `what-we-do-section`, `who-we-are-section`
- `timestamp` must be a valid ISO 8601 date/time

## Actions & Revalidation Behavior

### Articles

#### "created" - New Article

When a new article is created in the CMS:

```json
{
  "event": "article",
  "action": "created",
  "articleId": "my-new-article",
  "timestamp": "2025-01-20T14:30:00Z"
}
```

**Revalidates:**

- `/articles` - Articles listing page
- `/` - Home page (if it displays featured articles)

### "updated" - Article Modified

When an article is updated in the CMS:

```json
{
  "event": "article",
  "action": "updated",
  "articleId": "my-article-slug",
  "timestamp": "2025-01-20T14:30:00Z"
}
```

**Revalidates:**

- `/article/my-article-slug` - Article detail page
- `/articles` - Articles listing page
- `/` - Home page

### "deleted" - Article Removed

When an article is deleted from the CMS:

```json
{
  "event": "article",
  "action": "deleted",
  "articleId": "deleted-article",
  "timestamp": "2025-01-20T14:30:00Z"
}
```

**Revalidates:**

- `/articles` - Articles listing page
- `/` - Home page

### Partners

Example payload:

```json
{
  "event": "partner",
  "action": "updated",
  "partnerId": "partner-123",
  "timestamp": "2025-01-20T14:30:00Z"
}
```

**Revalidates:**

- `/about-us`
- `/`

### Awards

Example payload:

```json
{
  "event": "award",
  "action": "updated",
  "awardId": "award-123",
  "timestamp": "2025-01-20T14:30:00Z"
}
```

**Revalidates:**

- `/about-us`
- `/`

### Images

Example payload:

```json
{
  "event": "image",
  "action": "updated",
  "imageType": "hero",
  "timestamp": "2025-01-20T14:30:00Z"
}
```

#### imageType → pages

- `hero` → `/`, `/about-us`
- `about-section` → `/about-us`
- `what-we-do-section` → `/about-us`
- `who-we-are-section` → `/`, `/about-us`

## API Response Codes

| Status | Response           | Meaning                                    |
| ------ | ------------------ | ------------------------------------------ |
| 200    | Success            | Webhook processed successfully             |
| 400    | Bad Request        | Invalid payload or missing required fields |
| 401    | Unauthorized       | Invalid/missing authentication token       |
| 405    | Method Not Allowed | Request method is not POST                 |
| 500    | Server Error       | Processing failed (check website logs)     |

### Success Response (200)

```json
{
  "success": true,
  "message": "Webhook processed successfully for updated event",
  "data": {
    "action": "updated",
    "articleId": "article-123",
    "revalidatedPaths": ["/article/article-123", "/articles", "/"],
    "timestamp": "2025-01-20T14:30:00Z"
  }
}
```

### Error Response Examples

**400 Bad Request:**

```json
{
  "error": "Bad Request",
  "message": "Invalid action \"invalid\". Must be one of: created, updated, deleted"
}
```

**401 Unauthorized:**

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication header"
}
```

**500 Server Error:**

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred processing the webhook"
}
```

## CMS Integration Setup

### Step 1: Generate Webhook Secret

Generate a secure random string:

```bash
# On Linux/Mac:
openssl rand -hex 32

# Or use any strong random generator
```

### Step 2: Configure Website

1. Set `WEBHOOK_SECRET` environment variable with your generated secret
2. Deploy the updated configuration

### Step 3: Configure CMS

In your CMS platform, create a webhook per content type (or one webhook per event type, depending on CMS capabilities):

- **URL**: One of:
  - `https://your-domain.com/api/webhooks/articles`
  - `https://your-domain.com/api/webhooks/partners`
  - `https://your-domain.com/api/webhooks/awards`
  - `https://your-domain.com/api/webhooks/images`
- **Method**: POST
- **Headers**:
  ```
  Authorization: Bearer YOUR_WEBHOOK_SECRET
  Content-Type: application/json
  ```
- **Trigger Events**: When articles are created, updated, or deleted
- **Payload Format**: Use the format specified in "Webhook Payload Format" section

### Step 4: Test Webhook

Use curl to test the webhook:

```bash
curl -X POST https://your-domain.com/api/webhooks/articles \
  -H "Authorization: Bearer YOUR_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "article",
    "action": "created",
    "articleId": "test-article",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
  }' \
  --verbose
```

Expected response: `200 OK` with success message

## Environment Variables

- `WEBHOOK_SECRET` (required): Bearer token used by all webhook endpoints
- `WEBHOOK_VERBOSE_LOGGING` (optional): set to `true` to enable debug logs

## Monitoring & Logging

All webhook events are logged with:

- Timestamp of receipt
- Action and article ID
- Revalidated paths
- Any errors or warnings

### Viewing Logs

Logs are output to standard output and can be viewed:

- **Development**: Console output
- **Vercel/Netlify**: Function logs in dashboard
- **Self-hosted**: Container/process logs

### Debugging Failed Webhooks

If a webhook fails:

1. **Check authentication**: Verify `WEBHOOK_SECRET` is set correctly
2. **Verify payload format**: Ensure all required fields are present
3. **Check logs**: Look for error messages in website logs
4. **Check network**: Ensure CMS can reach the website URL
5. **Test locally**: Use curl to test manually

## Rate Limiting & Scaling

- No built-in rate limiting; CMS should implement retry logic
- Webhook processing is lightweight and fast (typically < 100ms)
- Revalidation is non-blocking; CMS receives 200 response immediately
- If webhook fails, fall back to next scheduled ISR cycle (1 hour)

## Security Best Practices

1. **Use HTTPS**: Always use HTTPS for production webhooks
2. **Rotate secrets**: Change webhook secrets periodically
3. **Environment-specific secrets**: Use different secrets for staging/production
4. **Access control**: Firewall webhook endpoint to CMS IP if possible
5. **Audit logging**: Monitor webhook logs for suspicious activity
6. **Error messages**: Website never exposes sensitive details in error responses

## Troubleshooting

### "Invalid or missing authentication header"

- Verify `WEBHOOK_SECRET` is set in environment
- Check Bearer token in CMS webhook configuration matches the secret
- Ensure `Authorization` header is included in the request

### "Invalid action \"xyz\""

- Verify action is exactly one of: `created`, `updated`, `deleted`
- Check for typos in CMS webhook configuration

### "Webhook processed successfully" but pages not updating

- Check if article files exist on disk
- Verify article ID matches actual article slug/ID
- Check ISR revalidation is working (verify manual page cache invalidation works)
- Check website logs for revalidation errors

### Webhook timeout or connection refused

- Verify webhook URL is correct and public
- Check if website is online and healthy
- Check firewall/security group rules allow outbound CMS connections
- Review website deployment logs for deployment errors

## Future Enhancements

Planned improvements to the webhook system:

- Support for other content types (press releases, partners)
- HMAC-SHA256 signature verification for enhanced security
- Webhook delivery history tracking
- Configurable retry logic for failed revalidations
- Webhook event filtering/routing
