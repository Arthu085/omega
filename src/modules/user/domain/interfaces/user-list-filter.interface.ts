import { Role } from '@/modules/role/domain';
import { EStatus } from '@/shared/domain';

export interface IUserListFilter {
  role?: Role;
  search?: string;
  status?: EStatus;
}
