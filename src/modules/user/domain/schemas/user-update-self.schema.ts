import { AddressSchema } from '@/shared/domain/schemas/address.schema';
import { z } from 'zod';

export const UserUpdateSelfSchema = z.object({
  name: z.string().min(1, 'Campo Obrigatório'),
  username: z.string().min(1, 'Campo Obrigatório'),
  email: z.string().min(1, 'Campo Obrigatório'),
  registration: z.string().optional(),
  document: z.string().optional(),
  password: z
    .string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres!')
    // .regex(/.*\d.*\d.*/, 'A senha deve conter pelo menos dois números.')
    // .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
    // .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
    // .regex(/.[!#$%^&()@_+.].*/, 'A senha deve conter pelo menos um caractere especial.')
    .optional(),
  phone: z.string().nullable(),
  dateOfBirth: z.coerce.date({ message: 'Data inválida"' }).nullable(),

  avatar: z.instanceof(File).optional().nullable(),

  address: AddressSchema,
});

export type UserUpdateSelfData = z.infer<typeof UserUpdateSelfSchema>;
