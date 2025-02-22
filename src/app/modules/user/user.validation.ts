import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  // needsPasswordChange: z.boolean().optional().default(true),
  // role: z.enum(['admin', 'student', 'faculty']),
  // status: z.enum(['blocked', 'in-progress']).default('in-progress'),
  // isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
