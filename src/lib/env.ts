import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  ANALYZE: z.enum(['true', 'false']).default('false'),
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string().min(1, 'SECRET_KEY is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().regex(/^\d+$/, 'PORT must be a number').transform(Number),
  EMAIL_SERVICE_API_KEY: z.string().min(1, 'EMAIL_SERVICE_API_KEY is required'),
  EMAIL_FROM: z.string().email(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_FEATURE_FLAG: z.string().optional().transform((val) => val === 'true'),
  STRIPE_PUBLIC_KEY: z.string().min(1, 'STRIPE_PUBLIC_KEY is required'),
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  AWS_ACCESS_KEY_ID: z.string().min(1, 'AWS_ACCESS_KEY_ID is required'),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, 'AWS_SECRET_ACCESS_KEY is required'),
  AWS_S3_BUCKET_NAME: z.string().min(1, 'AWS_S3_BUCKET_NAME is required'),
  AWS_REGION: z.string().min(1, 'AWS_REGION is required'),
});

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Environment variable validation failed');
}

// Export the validated environment variables
export const env = parsedEnv.data;
```

### Explanation of the Code:
1. **Schema Definition**:
   - The `z.object` method defines the structure and validation rules for the environment variables.
   - Each variable is validated based on its type and constraints (e.g., `url`, `email`, `enum`).

2. **Validation**:
   - The `safeParse` method validates the `process.env` object against the schema.
   - If validation fails, an error is logged, and the application throws an error to prevent startup with invalid configuration.

3. **Export**:
   - The validated environment variables are exported as `env` for use throughout the project.

### Review:
- The implementation adheres to the requirements:
  - Uses Zod for validation.
  - Ensures type safety and runtime validation.
  - Handles errors for missing or invalid variables.
- The code is complete, functional, and follows the project's TypeScript conventions.

### Next Steps:
- Add `zod` to the project dependencies by running:
  ```bash
  npm install zod