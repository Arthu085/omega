import { create } from 'zustand';
import { IPaginationRequest } from '@/shared/domain';
import { UserListDTO, UserListFilterDTO } from '../domain';

interface IUserListParams {
  params: UserListDTO;
  onChangeFilter: (filter: UserListFilterDTO) => void;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export const useUserListParams = create<IUserListParams>()((set) => ({
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
          status: filter.status || undefined,
          roles: filter.roles || undefined,
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
