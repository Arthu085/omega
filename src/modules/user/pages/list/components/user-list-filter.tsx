import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ControlledDebounce } from '@/shared/components';
import { EStatus } from '@/shared/domain';

import { IUserListFilter } from '@/modules/user/domain';
import { useUserListParams } from '@/modules/user/hooks';
import { ControlledRole } from '@/shared/components/fields/controlled-role';
import { ERolesUser } from '@/modules/user/domain/enums/user-roles';

export function UserListFilter() {
  const { params, onChangeFilter } = useUserListParams();

  const { control, watch } = useForm<IUserListFilter>({
    defaultValues: {
      search: params.filter.search ?? '',
      status: params.filter.status as EStatus | undefined,
      roles: params.filter.roles as ERolesUser | undefined,
      // company:
      //   params.filter.companyId && !isNaN(Number(params.filter.companyId))
      //     ? new Company({ id: Number(params.filter.companyId) })
      //     : undefined,
    },
  });

  const search = watch('search');
  const status = watch('status');
  const roles = watch('roles');

  useEffect(() => {
    onChangeFilter({
      search: search,
      status: status,
      roles: roles,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, search, status]);

  return (
    <Grid container spacing={2} component='form'>
      {/* {(user?.role?.reference === ERoleReference.ADMIN) &&
        <Grid item md={3} sm={6} xs={6}>
          <ControlledCompany label='Empresa' name='company' control={control} />
        </Grid>
      } */}
      {/* <Grid item md={3} sm={6} xs={6}>
        <ControlledEnum
          label='Status'
          name='status'
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
        />
      </Grid> */}

      <Grid item md={3} sm={6} xs={6}>
        <ControlledRole label='Perfil' name='roles' control={control} />
      </Grid>

      <Grid item md={3} sm={6} xs={6}>
        <ControlledDebounce label='Procurar' name='search' control={control} />
      </Grid>
    </Grid>
  );
}
