import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Please enter an email',
    })
    .email({ message: 'Must be a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least 1 uppercase characters',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least 1 lowercase characters',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least 1 number',
    })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: 'Password must contain at least 1 special character',
    }),
});

export const loginResolver = zodResolver(loginSchema);

export type LoginSchema = z.infer<typeof loginSchema>;
