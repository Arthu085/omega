import { Role } from '@/modules/role/domain';
import { z } from 'zod';

export const userUpdateSchema = z.object({
  role: z.instanceof(Role).optional().nullable(),
  name: z.string({ required_error: 'Campo obrigatório!' }).min(3, 'Campo obrigatório!'),
  email: z.string({ required_error: 'Campo obrigatório!' }).email('Email inválido!').email(),
  hash_password: z.string().optional().nullable(),
});

export type UserUpdateData = z.infer<typeof userUpdateSchema>;
