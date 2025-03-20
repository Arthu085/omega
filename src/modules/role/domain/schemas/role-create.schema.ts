import { z } from 'zod';
import { ERoleReference } from '../enums';
import { Ability } from '../entities';
export const roleCreateSchema = z.object({
  name: z.string().min(5, 'Nome do perfil obrigatório!'),
  reference: z.nativeEnum(ERoleReference, {
    required_error: 'Precisa selecionar um perfil de referência!',
    invalid_type_error: 'Perfil de referência inválido!',
  }),
  baseProfile: z.boolean().optional(),
  permissions: z
    .array(z.instanceof(Ability))
    .min(1, 'É necessário ao menos uma permissão para o perfil.'),
});

export type RoleCreateData = z.infer<typeof roleCreateSchema>;
