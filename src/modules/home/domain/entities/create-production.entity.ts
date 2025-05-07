import { z } from 'zod';

export const createProductionEntity = z.object({
  loteFrita: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  lote: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  temperatura: z
    .string({ required_error: 'Campo obrigatório!' })
    .min(14, 'O CNPJ deve ter ao menos 14 caracteres')
    .trim(),
  oleo: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  oxigenio: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  peso: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  rpm: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  tMovel: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
});

export type CreateProductionEntity = z.infer<typeof createProductionEntity>;
