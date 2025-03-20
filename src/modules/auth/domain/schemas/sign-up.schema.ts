import { z } from 'zod';
import { AddressSchema } from '@/shared/domain';
import { Role } from '@/modules/role/domain';

export const signUpSchema = z.object({
  companyName: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  tradeName: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  cnpj: z
    .string({ required_error: 'Campo obrigatório!' })
    .min(14, 'O CNPJ deve ter ao menos 14 caracteres')
    .trim(),
  phone: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  email: z.string().min(8, 'O E-mail deve ter ao menos 8 caracteres').trim(),
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres').trim(),
  confirm: z.string().min(8, 'A senha deve ter ao menos 8 caracteres').trim(),

  role: z.instanceof(Role).optional(),
  address: AddressSchema,
});

export type SignUpData = z.infer<typeof signUpSchema>;
