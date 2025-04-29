import { IPaginationRequest } from '@/shared/domain';

export interface FornosListFilterDTO {
  search?: string;
  level?: number;
}

export interface FornosListDTO {
  filter: FornosListFilterDTO;
  pagination: IPaginationRequest;
}
