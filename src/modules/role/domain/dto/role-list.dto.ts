import { IPaginationRequest } from '@/shared/domain';
import { ERoleReference } from '../enums';

export interface RoleListFilterDTO {
  search?: string;
  name?: string;
  reference?: ERoleReference;
  companyId?: number;
}

export interface RoleListDTO {
  filter: RoleListFilterDTO;
  pagination: IPaginationRequest;
}
