import { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DataTable,
  DataTableColumnEmail,
  DataTableColumnMenu,
  DataTableColumnStatus,
  DataTableToggleColumns
} from '@/shared/components';
import { IMenu, IOption, IPaginationRequest, IPaginationResponse, IStatus } from '@/shared/domain';

import { ERolesUser } from '@/modules/user/domain/enums/user-roles';
import { User, UserListDTO } from '@/modules/user/domain';
import { EStatusUser, EStatusUserTranslate } from '@/modules/user/domain/enums/user-status';
import { UserCreateForm } from '../../create/components/user-create-form';

interface UserListTableProps {
  data: { data: User[]; total: number } | undefined;
  isLoading: boolean;
  error: string | null;
  mutate: () => Promise<IPaginationResponse<User> | undefined>;
  params: UserListDTO;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export function UserListTable({
  data,
  isLoading,
  error,
  mutate,
  params,
  onChangePagination,
}: UserListTableProps) {
  
  const [editData, setEditData] = useState<any>(null);
  const [idEditData, setIdEditData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  
    const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
        email: { label: 'email', value: true },
        nome: { label: 'nome', value: true },
        sobrenome: { label: 'sobrenome', value: true },
        senha: { label: 'senha', value: true },
        roles: { label: 'função', value: true },
        status: { label: 'status', value: true},
    });

  function handleToggleColumn(column: string) {
    setToggleColumns((prev) => ({
      ...prev,
      [column]: {
        label: prev[column].label,
        value: !prev[column].value,
      },
    }));
  }

  const editPhase = (id: number) => {
    if (data) {
        const phaseData = data.data.find((phase: any) => phase.id === id);
        if (phaseData) {
            setEditData(phaseData);
            setIdEditData(id)
            setIsOpen(true)
        }
    }
  }

  const columns: Array<MUIDataTableColumnDef> = [
     {
       name: 'status',
       label: toggleColumns['status'].label,
       options: {
         sortThirdClickReset: true,
         display: toggleColumns['status'].value,
         customBodyRender: (value: EStatusUser) => {
           const status: Array<IStatus<EStatusUser>> = [
             {
               label: EStatusUserTranslate.ACTIVE,
               value: EStatusUser.ACTIVE,
               color: 'success',
             },
             {
               label: EStatusUserTranslate.INATIVE,
               value: EStatusUser.INATIVE,
               color: 'primary',
             },
           ]

           return DataTableColumnStatus({ status, value });
         },
       },
     },
    {
      name: 'nome',
      label: toggleColumns['nome'].label,
      options: {
        sortThirdClickReset: true,
        display: toggleColumns['nome'].value,
      },
    },
    {
      name: 'sobrenome',
      label: toggleColumns['sobrenome'].label,
      options: {
        sortThirdClickReset: true,
        display: toggleColumns['sobrenome'].value,
      },
    },
    {
      name: 'roles',
      label: toggleColumns['roles'].label,
      options: {
          sort: false,
          sortThirdClickReset: true,
          display: toggleColumns['roles'].value,
          customBodyRender: (value: ERolesUser) => {
            const status: Array<IStatus<ERolesUser>> = [
              {
                label: ERolesUser.USER,
                value: ERolesUser.USER,
                color: 'success',
              },
              {
                label: ERolesUser.USER,
                value: ERolesUser.USER,
                color: 'primary',
              },
            ]

            return DataTableColumnStatus({ status, value });
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
        customBodyRender: (id: number) => {

          const items: Array<IMenu> = [
            {
              label: 'Editar dados',
              action: () => editPhase(id),
            },
          ];
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

  const handleCloseModal = () => {
    setIsOpen(false)
    setIdEditData(null)
    setEditData(null)
    mutate()
}
  return (
    <Fragment>
    <DataTable
        loading={isLoading}
        data={data ? data.data : []}
        columns={columns}
        options={options}
        error={error}
    />
    <UserCreateForm id={idEditData} data={editData} isOpen={isOpen} onClose={() => handleCloseModal()} />
</Fragment>
  );
}
