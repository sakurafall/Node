import { z } from 'zod';

export const signupBodySchema = z.object({
  email: z.string().email('Invalid email').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

export const loginBodySchema = signupBodySchema;
