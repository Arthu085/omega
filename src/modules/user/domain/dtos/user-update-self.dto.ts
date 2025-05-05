import { ERolePermissions } from '@/modules/role/domain/enums/role-permissions.enum';
import { ERolesUser } from '../enums/user-roles';
import { EStatusUser } from '../enums/user-status';

export interface UserUpdateSelfDto {
  // Dados Gerais
  nome?: string;
  lastname?: string,
  status?: EStatusUser;
  email?: string,
  senha?: string,
  role?: ERolesUser
}
