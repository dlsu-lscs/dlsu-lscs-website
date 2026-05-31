# AGENTS.md - Codebase Conventions for LSCS Website

## Project Overview

- **Framework**: Next.js 16 with React 19, TypeScript, TailwindCSS v4
- **Testing**: Vitest with happy-dom
- **Linting**: ESLint with eslint-config-next/core-web-vitals
- **Formatting**: Prettier

---

## Build/Lint/Test Commands

```bash
# Development
npm run dev                  # Start dev server with turbopack
npm run build               # Production build
npm run start               # Start production server

# Linting & Formatting
npm run lint                # Run ESLint on all files
npm run format             # Format code with Prettier

# Testing
npm run test               # Run tests in watch mode
npm run test:ci           # Run tests once with coverage
vitest run src/lib/webhooks/__tests__/validator.test.ts  # Single test file
vitest run --reporter=verbose src/lib/webhooks/__tests__/validator.test.ts -t "should validate"
```

### Running a Single Test

```bash
# By file
vitest run src/lib/webhooks/__tests__/validator.test.ts

# By test name pattern
vitest run -t "should validate a correct payload"

# With reporter
vitest run src/lib/webhooks/__tests__/validator.test.ts --reporter=verbose
```

---

## Code Style Guidelines

### Formatting (Prettier)

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

### TypeScript

- **Strict mode**: enabled in tsconfig.json
- **Module resolution**: `bundler`
- **JSX**: `react-jsx`
- Always enable strict type checking; avoid `any`

### Imports

- Use `@/` alias for `/src` directory
- Example: `import { cn } from '@/lib/utils'`
- Group imports: external → internal → relative

```typescript
// External
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

// Internal (from @/)
import { cn } from '@/lib/utils';

// Types (local)
import { SomeType } from './types';
```

---

## Naming Conventions

| Type             | Convention                  | Example                              |
| ---------------- | --------------------------- | ------------------------------------ |
| Components       | PascalCase                  | `Button`, `ArticleCard`              |
| Files            | kebab-case                  | `press-release-card.tsx`             |
| Directories      | kebab-case                  | `containers/`, `components/`         |
| Hooks            | camelCase with `use` prefix | `useDebouncer`, `useScrollDirection` |
| Functions        | camelCase                   | `validatePayload`, `cn`              |
| Types/Interfaces | PascalCase                  | `Article`, `PressRelease`            |
| Constants        | SCREAMING_SNAKE_CASE        | `WebhookErrorType`                   |
| CSS Classes      | kebab-case (Tailwind)       | `bg-primary`, `text-destructive`     |

---

## Component Structure

Follow this pattern for UI components:

```typescript
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const componentVariants = cva('base classes...', {
  variants: {
    variant: { default: '...', secondary: '...' },
    size: { default: '...', sm: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

function Component({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'element'> &
  VariantProps<typeof componentVariants>) {
  return <Element className={cn(componentVariants({ variant, size, className }))} {...props} />;
}

export { Component, componentVariants };
```

---

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/              # API routes
│   └── [slug]/           # Dynamic routes
├── components/           # Shared UI components
│   ├── ui/              # Base components (Button, Sheet, etc.)
��   ├── molecules/        # Composite components
│   └── organism/         # Complex components (Navbar)
├── features/              # Feature-specific code
│   ├── home/
│   ├── articles/
│   └── press-release/
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, helpers
│   ├── webhooks/        # Webhook processing logic
│   └── utils.ts         # cn() utility
└── types/                # Shared type definitions
```

---

## Error Handling

- Use custom error classes for domain-specific errors:

```typescript
class WebhookError extends Error {
  constructor(
    public type: WebhookErrorType,
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'WebhookError';
  }
}
```

- Use proper HTTP status codes in API routes (400, 401, 403, 500, etc.)
- Return consistent error response format:

```typescript
// In API routes
return Response.json({ error: 'message' }, { status: 400 });
```

---

## Testing Guidelines

### Test File Location

- Place tests in `__tests__/` subdirectory next to the source file
- Naming: `*.test.ts` or `*.test.tsx`

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('functionName', () => {
  beforeEach(() => {
    // Reset state
  });

  it('should do something specific', () => {
    const result = functionName(input);
    expect(result).toBe(expected);
  });
});
```

### Assertions

- Use Vitest expect API
- Prefer `toBe`, `toEqual`, `toBeInstanceOf`, `toContain`
- Test both success and failure cases

---

## API Routes

- Use Next.js App Router (`app/api/*/route.ts`)
- Return `Response.json()` with proper status codes
- Validate input with Zod or custom validators
- Use proper error handling with try/catch

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Process
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 400 });
  }
}
```

---

## TailwindCSS Patterns

- Use Tailwind v4 with `@tailwindcss/postcss`
- Use `cn()` utility for conditional classes
- Follow design system tokens (define in CSS)

```typescript
// Conditional classes
cn('base-class', condition && 'conditional-class');

// Multiple conditions
cn('base', {
  'variant-specific': variant === 'specific',
});
```

---

## Lint and Pre-commit

The project uses lint-staged for pre-commit checks:

```bash
# Triggers on staged .js, .jsx, .ts, .tsx, .mjs files
npm run format    # Runs prettier --write
npm run lint    # Runs eslint --fix

# On .json, .css, .md files
npm run format   # Runs prettier --write
```

Always run `npm run format` and `npm run lint` before committing.

---

## Dependencies

| Category  | Packages                                                     |
| --------- | ------------------------------------------------------------ |
| UI        | @radix-ui/react-slot, class-variance-authority, lucide-react |
| Animation | framer-motion, tw-animate-css                                |
| Styling   | tailwindcss@4, @tailwindcss/postcss, @tailwindcss/typography |
| Testing   | vitest, @testing-library/react, happy-dom                    |
| Markdown  | react-markdown, gray-matter                                  |

---

## Environment Variables

- Use `.env` files for local development
- Access via `process.env.VARIABLE_NAME`
- Document required vars in code comments

```typescript
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
if (!WEBHOOK_SECRET) {
  throw new Error('WEBHOOK_SECRET is not configured');
}
```
