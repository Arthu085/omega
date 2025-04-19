import { create } from 'zustand';
import { IPaginationRequest } from '@/shared/domain';
import { FornosListDTO, FornosListFilterDTO } from '../domain/dto/fornos-list.dto';


interface IFurnaceListParams {
  params: FornosListDTO;
  onChangeFilter: (filter: FornosListFilterDTO) => void;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export const useFornosListParams = create<IFurnaceListParams>()((set) => ({
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
