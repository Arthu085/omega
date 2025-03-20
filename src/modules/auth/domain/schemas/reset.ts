import { z } from 'zod';

export const resetSchema = z
  .object({
    token: z.string().min(1).trim(),
    password: z.string().min(8, 'Senha de no mínimo 8 caracteres.').trim(),
    confirm: z.string().min(1, 'Campo obrigatório!').trim(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Confirmação da senha incorreta!',
    path: ['confirm'],
  });

export type ResetData = z.infer<typeof resetSchema>;
