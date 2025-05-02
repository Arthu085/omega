import { create } from 'zustand';
import { IPaginationRequest } from '@/shared/domain';
import { ProductionListDTO, ProductionListFilterDTO } from '../domain/dto/production-list.dto';


interface IProductionListParams {
  params: ProductionListDTO;
  onChangeFilter: (filter: ProductionListFilterDTO) => void;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export const useProductionListParams = create<IProductionListParams>()((set) => ({
  params: {
    filter: {},
    pagination: {
      take: 10,
      skip: 1,
    },
  },

  onChangeFilter: (filter) =>
    set(({ params: prev }) => ({
      params: {
        filter: {
          ...prev.filter,
          search: filter.search || undefined,
          level: filter.level || undefined,
        },
        pagination: {
          ...prev.pagination,
          skip: 1,
        },
      },
    })),

  onChangePagination: (pagination) =>
    set(({ params: prev }) => ({
      params: {
        ...prev,
        pagination: {
          ...prev.pagination,
          ...pagination,
        },
      },
    })),
}));
