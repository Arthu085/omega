import { z } from 'zod';
import { EStatusUser } from '../enums/user-status';
import { ERolesUser } from '../enums/user-roles';

export const userCreateSchema = z.object({
  status: z.nativeEnum(EStatusUser, { required_error: 'Campo obrigatório!' }),
  role: z.nativeEnum(ERolesUser,{ required_error: 'Campo obrigatório!' }),
  name: z.string({ required_error: 'Campo obrigatório!' }).min(3, 'Campo obrigatório!'),
  lastname: z.string({ required_error: 'Campo obrigatório!' }).min(3, 'Campo obrigatório!'),
  email: z.string({ required_error: 'Campo obrigatório!' }).email('Email inválido!').email(),
  password: z.string({ required_error: 'Campo obrigatório!' }).min(8, 'Campo obrigatório!'),
});

export type UserCreateData = z.infer<typeof userCreateSchema>;
