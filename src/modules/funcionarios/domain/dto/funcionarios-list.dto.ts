import { IPaginationRequest } from '@/shared/domain';

export interface FuncionariosListFilterDTO {
  search?: string;
  level?: number;
}

export interface FuncionariosListDTO {
  filter: FuncionariosListFilterDTO;
  pagination: IPaginationRequest;
}
