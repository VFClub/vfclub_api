import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string(),
  MAIL_SECURE: z.string(),
  MAIL_AUTH_USER: z.string(),
  MAIL_AUTH_PASS: z.string(),
  MAIL_SENDER: z.string(),
});

export type Env = z.infer<typeof envSchema>;
