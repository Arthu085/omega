import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(8, 'Campo obrigatório!').toLowerCase().trim(),
  password: z.string().min(8, 'Senha de no mínimo 8 caracteres!').trim(),
  remember: z.boolean(),
});

export type LoginData = z.infer<typeof loginSchema>;
