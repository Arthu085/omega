import { useAuth } from '@/modules/auth/hooks';
import {
  Ability,
  EAbilityAction,
  EAbilityActionTranslate,
  EAbilityCodes,
  EAbilityCodesTranslate,
  ERoleReference,
  Role,
} from '@/modules/role/domain';
import { useRoleListParams } from '@/modules/role/hooks/role-list-params.hook';
import { useRole } from '@/modules/role/hooks/role.hook';
import { RoleRepository } from '@/modules/role/repositories/role.repository';
import { DataTable, DataTableColumnMenu, DataTableToggleColumns } from '@/shared/components';
import { IMenu, IOption } from '@/shared/domain';
import { Chip, Typography } from '@mui/material';
import { MUIDataTableColumnDef, MUIDataTableMeta, MUIDataTableOptions } from 'mui-datatables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import useSWR from 'swr';

export function RoleListTable() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const roleRepository = new RoleRepository();
  const canDelete = true;

  const { params, onChangePagination } = useRoleListParams();
  const { deleteRole } = useRole();

  const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
    baseProfile: { label: 'Padrão', value: true },
    id: { label: 'ID', value: true },
    name: { label: 'Perfil', value: true },
    permissions: { label: 'Permissões', value: true },
  });

  const { data, isLoading, error, mutate } = useSWR([`role-list-${user?.id}`, params], ([_url, value]) =>
    roleRepository.list(value),
  );

  function groupByField(list: Ability[], field: string) {
    return list.reduce((acc: any, obj: any) => {
      const key: any = obj[field];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  function handleTranslatePermissions(permissions: Ability[]) {
    const groupedPermissions: any = groupByField(permissions, 'code');
    const translatePermissions: any[] = [];

    Object.entries(groupedPermissions).map((element: any) => {
      const code: any = element[0];
      const abilities: any[] = element[1];
      if (abilities.length == 4) {
        translatePermissions.push(
          <Chip
            key={code}
            label={EAbilityCodesTranslate[code as EAbilityCodes]}
            variant='outlined'
            size='small'
            sx={{ m: '3px' }}
          />,
        );
      } else {
        abilities.map((ability: Ability) => {
          switch (ability.action) {
            case EAbilityAction.CREATE:
              translatePermissions.push(
                <Chip
                  key={ability.name + 'create'}
                  label={` ${EAbilityActionTranslate[ability.action]} ${ability.name}`}
                  variant='outlined'
                  size='small'
                  sx={{ m: '3px' }}
                />,
              );
              break;
            case EAbilityAction.UPDATE:
              translatePermissions.push(
                <Chip
                  key={ability.name + 'edit'}
                  label={` ${EAbilityActionTranslate[ability.action]} ${ability.name}`}
                  variant='outlined'
                  size='small'
                  sx={{ m: '3px' }}
                />,
              );
              break;
            case EAbilityAction.DELETE:
              translatePermissions.push(
                <Chip
                  key={ability.name + 'delete'}
                  label={`${EAbilityActionTranslate[ability.action]} ${ability.name}`}
                  variant='outlined'
                  size='small'
                  sx={{ m: '3px' }}
                />,
              );
              break;
            case EAbilityAction.READ:
              translatePermissions.push(
                <Chip
                  key={ability.name + 'read'}
                  label={` ${EAbilityActionTranslate[ability.action]} ${ability.name}`}
                  variant='outlined'
                  size='small'
                  sx={{ m: '3px' }}
                />,
              );
              break;
          }
        });
      }
    });

    return translatePermissions;
  }

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
    {
      name: 'baseProfile',
      label: toggleColumns['baseProfile'].label,
      options: {
        display: 'false',
      },
    },
    {
      name: 'id',
      label: toggleColumns['id'].label,
      options: {
        sort: false,
        sortThirdClickReset: true,
        display: toggleColumns['id'].value,
        customBodyRender: (id?: number) => {
          return id ?? '';
        },
      },
    },
    {
      name: 'name',
      label: toggleColumns['name'].label,
      options: {
        sortThirdClickReset: true,
        display: toggleColumns['name'].value,
        customBodyRender: (name: string, tableMeta: MUIDataTableMeta) => {
          const [baseProfile] = tableMeta.rowData;
          if (baseProfile) {
            return (
              <Typography component='span' variant='body2' sx={{ fontWeight: 600 }}>
                {name}
                <Chip label='Padrão' size='small' color='primary' sx={{ m: '10px' }} />
              </Typography>
            );
          } else {
            return name ?? '';
          }
        },
      },
    },
    {
      name: 'company',
      label: toggleColumns['company'].label,
      options: {
        sort: false,
        sortThirdClickReset: true,
        display: toggleColumns['company'].value,
        // customBodyRender: (company?: Company) => {
        //   return company?.companyName ?? '-';
        // },
      },
    },
    {
      name: 'permissions',
      label: toggleColumns['permissions'].label,
      options: {
        sortThirdClickReset: true,
        display: toggleColumns['permissions'].value,
        customBodyRender: (permissions?: Ability[]) => {
          return handleTranslatePermissions(permissions!) ?? '-';
        },
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
              label: 'Ver Detalhes',
              action: () => navigate(`./${id}`),
            }
          ];

          if (canDelete) {
            items.push({
              label: 'Excluir',
              action: () => deleteRole(id, mutate),
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
        data={
          data
            ? user?.role?.reference === ERoleReference.ADMIN
              ? data.data
              : data.data
                .filter((role: Role) => role.reference !== ERoleReference.ADMIN)
                .map((role: Role) => role)
            : []
        }
        columns={
          user?.role?.reference === ERoleReference.ADMIN
            ? columns
            : columns.filter((col: any) => col.name !== 'company').map((col: any) => col)
        }
        options={options}
        error={error}
      />
    </Fragment>
  );
}
