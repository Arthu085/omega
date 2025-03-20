import { z } from 'zod';

export const AddressSchema = z.object({
  id: z.number().optional(),
  postcode: z.string().min(1, 'Campo Obrigatório'),
  country: z.string().default('Brasil'),
  state: z.string().optional(),
  city: z.string().min(1, 'Campo Obrigatório'),
  street: z.string().min(1, 'Campo Obrigatório'),
  neighborhood: z.string().min(1, 'Campo Obrigatório'),
  number: z.string().optional(),
  complement: z.string().optional().nullable(),
});

export type AddressCreateData = z.infer<typeof AddressSchema>;
