import { Role } from '@/modules/role/domain';
import { z } from 'zod';
import { EStatusForno } from '../enums/status-fornos.enum';

export const CreateFurnaceSchema = z.object({
  status: z.nativeEnum(EStatusForno, { required_error: 'Campo obrigatório!' }),
  name: z.string({ required_error: 'Campo obrigatório!' }).min(3, 'Campo obrigatório!'),
  nroForno: z.number({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  situacao: z.string().optional().nullable(),
  role: z.instanceof(Role).optional().nullable(),
});

export type CreateFurnaceSchema = z.infer<typeof CreateFurnaceSchema>;
