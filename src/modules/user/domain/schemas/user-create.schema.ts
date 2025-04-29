import { Role } from '@/modules/role/domain';
import { EStatus } from '@/shared/domain';
import { z } from 'zod';

export const userCreateSchema = z.object({
  status: z.nativeEnum(EStatus, { required_error: 'Campo obrigatório!' }),
  role: z.instanceof(Role).optional().nullable(),
  name: z.string({ required_error: 'Campo obrigatório!' }).min(3, 'Campo obrigatório!'),
  email: z.string({ required_error: 'Campo obrigatório!' }).email('Email inválido!').email(),
  username: z.string({ required_error: 'Campo obrigatório!' }).min(3, 'Campo obrigatório!'),
  password: z.string({ required_error: 'Campo obrigatório!' }).min(8, 'Campo obrigatório!'),
  registration: z.string().optional(),
});

export type UserCreateData = z.infer<typeof userCreateSchema>;
