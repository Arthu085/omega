import { IPaginationRequest } from '@/shared/domain';
import { ERolesUser } from '../enums/user-roles';

export interface UserListFilterDTO {
  search?: string;
  status?: string;
  roles?: ERolesUser;
}

export interface UserListDTO {
  filter: UserListFilterDTO;
  pagination: IPaginationRequest;
}
