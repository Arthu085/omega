import { z } from 'zod';

export const recoverSchema = z.object({
  email: z
    .string()
    .min(1, 'Campo obrigatório!')
    .email('E-mail inválido!')
    .max(100, 'E-mail muito longo!')
    .trim(),
});

export type RecoverData = z.infer<typeof recoverSchema>;
