import { IPaginationRequest } from '@/shared/domain';

export interface ProductionListFilterDTO {
  search?: string;
  level?: number;
}

export interface ProductionListDTO {
  filter: ProductionListFilterDTO;
  pagination: IPaginationRequest;
}
