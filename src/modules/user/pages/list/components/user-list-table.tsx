import { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import {
  DataTable,
  DataTableColumnEmail,
  DataTableColumnMenu,
  DataTableToggleColumns
} from '@/shared/components';
import { IMenu, IOption } from '@/shared/domain';

import { useAuth } from '@/modules/auth/hooks';
import { Role } from '@/modules/role/domain';
import { useUser, useUserListParams } from '@/modules/user/hooks';
import { UserRepository } from '@/modules/user/repositories';

export function UserListTable() {
  const { user } = useAuth();
  const canDelete = true

  const navigate = useNavigate();

  const userRepository = new UserRepository();

  const { params, onChangePagination } = useUserListParams();
  const { deleteUser } = useUser();

  const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
    role: { label: 'Perfil', value: true },
    name: { label: 'Nome', value: true },
    email: { label: 'E-mail', value: true },
  });

  const { data, isLoading, error, mutate } = useSWR([`user-list-${user?.id}`, params], ([_url, value]) =>
    userRepository.list(value),
  );

  function handleToggleColumn(column: string) {
    setToggleColumns((prev) => ({
      ...prev,
      [column]: {
        label: prev[column].label,
        value: !prev[column].value,
      },
    }));
  }

  const columns: Array<MUIDataTableColumnDef> = [
    // {
    //   name: 'status',
    //   label: toggleColumns['status'].label,
    //   options: {
    //     sortThirdClickReset: true,
    //     display: toggleColumns['status'].value,
    //     customBodyRender: (value: EStatus) => {
    //       const status: Array<IStatus<EStatus>> = [
    //         {
    //           label: EStatusTranslate.WAITING,
    //           value: EStatus.WAITING,
    //           color: 'primary',
    //         },
    //         {
    //           label: EStatusTranslate.ACTIVE,
    //           value: EStatus.ACTIVE,
    //           color: 'secondary',
    //         },
    //         {
    //           label: EStatusTranslate.INACTIVE,
    //           value: EStatus.INACTIVE,
    //           color: 'default',
    //         },
    //         {
    //           label: EStatusTranslate.BLOCKED,
    //           value: EStatus.BLOCKED,
    //           color: 'error',
    //         },
    //       ];

    //       return DataTableColumnStatus({ status, value });
    //     },
    //   },
    // },
    {
      name: 'name',
      label: toggleColumns['name'].label,
      options: {
        sortThirdClickReset: true,
        display: toggleColumns['name'].value,
      },
    },
    {
      name: 'role',
      label: toggleColumns['role'].label,
      options: {
        sort: false,
        sortThirdClickReset: true,
        display: toggleColumns['role'].value,
        customBodyRender: (role?: Role) => {
          return role?.name ?? '';
        },
      },
    },
    {
      name: 'email',
      label: toggleColumns['email'].label,
      options: {
        sortThirdClickReset: true,
        display: toggleColumns['email'].value,
        customBodyRender: (email: string) => DataTableColumnEmail({ email }),
      },
    },
    // {
    //   name: 'phone',
    //   label: toggleColumns['phone'].label,
    //   options: {
    //     sortThirdClickReset: true,
    //     display: toggleColumns['phone'].value,
    //     customBodyRender: (phone: string) => phone === null ? '' : DataTableColumnPhone({ phone }),
    //   },
    // },
    {
      name: 'id',
      label: ' ',
      options: {
        sort: false,
        customHeadLabelRender: () => {
          return (
            <DataTableToggleColumns
              toggleColumns={toggleColumns}
              onToggle={handleToggleColumn}
              setToggleColumns={setToggleColumns}
            />
          );
        },
        customBodyRender: (id: number, { }) => {
          // const rowUser = data?.data.at(rowIndex);

          // const newStatus: EStatus =
          //   EStatus.ACTIVE;

          // const updateStatusLavel: string =
          //   newStatus === EStatus.ACTIVE ? 'Liberar Acesso' : 'Bloquear Acesso';

          const items: Array<IMenu> = [
            {
              label: 'Ver Detalhes',
              action: () => navigate(`./${id}`),
            },
            // {
            //   label: updateStatusLavel,
            //   action: () => updateStatusUser(id, newStatus, mutate),
            // },
          ];

          if (canDelete) {
            items.push({
              label: 'Excluir',
              action: () => deleteUser(id, mutate),
            });
          }

          return <DataTableColumnMenu items={items} />;
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    page: (params.pagination.skip ?? 1) - 1,
    rowsPerPage: params.pagination.take,
    count: data?.total,

    setRowProps: () => ({ style: { cursor: 'pointer' } }),

    onRowClick: (_, { dataIndex }) => {
      const { id } = data?.data[dataIndex] as any;

      if (id) navigate(`./${id}`);
    },

    onChangePage: (currentPage: number) =>
      onChangePagination({
        skip: currentPage + 1,
      }),

    onChangeRowsPerPage: (numberOfRows: number) =>
      onChangePagination({
        take: numberOfRows,
      }),

    onColumnSortChange: (changedColumn: string, direction: 'asc' | 'desc' | 'none') => {
      if (direction === 'none') {
        onChangePagination({
          orderBy: undefined,
          ordering: undefined,
        });
        return;
      }

      onChangePagination({
        orderBy: changedColumn,
        ordering: direction,
      });
    },
  };

  return (
    <Fragment>
      <DataTable
        loading={isLoading}
        data={data ? data.data : []}
        columns={columns}
        options={options}
        error={error}
      />
    </Fragment>
  );
}
