import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ControlledDebounce } from '@/shared/components';
import { EStatus } from '@/shared/domain';

import { Role } from '@/modules/role/domain';
import { IUserListFilter } from '@/modules/user/domain';
import { useUserListParams } from '@/modules/user/hooks';
import { ControlledRole } from '@/shared/components/fields/controlled-role';

export function UserListFilter() {
  const { params, onChangeFilter } = useUserListParams();

  const { control, watch } = useForm<IUserListFilter>({
    defaultValues: {
      search: params.filter.search ?? '',
      status: params.filter.status as EStatus | undefined,
      role:
        params.filter.roleId && !isNaN(Number(params.filter.roleId))
          ? new Role({ id: Number(params.filter.roleId) })
          : undefined,
      // company:
      //   params.filter.companyId && !isNaN(Number(params.filter.companyId))
      //     ? new Company({ id: Number(params.filter.companyId) })
      //     : undefined,
    },
  });

  const search = watch('search');
  const status = watch('status');
  const role = watch('role');

  useEffect(() => {
    onChangeFilter({
      search: search,
      status: status,
      roleId: role?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, search, status]);

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
        <ControlledRole label='Perfil' name='role' control={control} />
      </Grid>

      <Grid item md={3} sm={6} xs={6}>
        <ControlledDebounce label='Procurar' name='search' control={control} />
      </Grid>
    </Grid>
  );
}
