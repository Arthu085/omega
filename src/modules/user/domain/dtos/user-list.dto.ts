import { IPaginationRequest } from '@/shared/domain';

export interface UserListFilterDTO {
  search?: string;
  status?: string;
  companyId?: number;
  roleId?: number;
}

export interface UserListDTO {
  filter: UserListFilterDTO;
  pagination: IPaginationRequest;
}
