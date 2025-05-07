import { Role } from '@/modules/role/domain';
import { EStatus } from '@/shared/domain';
import { ERolesUser } from '../enums/user-roles';

export interface IUserListFilter {
  role?: ERolesUser;
  search?: string;
  status?: EStatus;
}
