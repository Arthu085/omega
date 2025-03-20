import { create } from 'zustand';
import { IPaginationRequest } from '@/shared/domain';
import { RoleListDTO, RoleListFilterDTO } from '@/modules/role/domain/dto';

interface IRoleListParams {
  params: RoleListDTO;
  onChangeFilter: (filter: RoleListFilterDTO) => void;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export const useRoleListParams = create<IRoleListParams>()((set) => ({
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
          name: filter.name || undefined,
          reference: filter.reference || undefined,
          companyId: filter.companyId || undefined,
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
