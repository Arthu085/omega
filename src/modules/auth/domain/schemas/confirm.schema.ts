import { z } from 'zod';

export const confirmSchema = z
  .object({
    token: z.string().min(1).trim(),
  })

export type ConfirmData = z.infer<typeof confirmSchema>;
