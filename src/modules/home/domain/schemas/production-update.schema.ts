import { z } from 'zod';
import { EStatusProduction } from '../enums/status-production.enum';

export const productionUpdateSchema = z.object({
  forno: z.object({
    id: z.number({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  }),
  lote: z.number({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  loteFrita: z.string({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  oleo: z.number({ required_error: 'Campo obrigatório!' }),
  peso: z.number({ required_error: 'Campo obrigatório!' }).min(1, 'Campo obrigatório!'),
  oxigenio: z.number({ required_error: 'Campo obrigatório!' }),
  tMovel: z.number({ required_error: 'Campo obrigatório!' }),
  temperatura: z.number({ required_error: 'Campo obrigatório!' }),
  rpm: z.number({ required_error: 'Campo obrigatório!' }),
  status: z.nativeEnum(EStatusProduction).optional(),
});

export type productionUpdateSchema = z.infer<typeof productionUpdateSchema>;
