import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ControlledDebounce, ControlledEnum } from '@/shared/components';

import { useAuth } from '@/modules/auth/hooks';
import { ERoleReference, ERoleReferenceTranslate, ERoleUserReference } from '@/modules/role/domain';
import { IRoleListFilter } from '@/modules/role/domain/interfaces/role-list-filter.interface';
import { useRoleListParams } from '@/modules/role/hooks/role-list-params.hook';

export function RoleListFilter() {
  const { user } = useAuth();
  const { params, onChangeFilter } = useRoleListParams();

  const { control, watch } = useForm<IRoleListFilter>({
    defaultValues: {
      search: params.filter.search ?? '',
      name:
        params.filter.name ?? '',
      reference:
        params.filter.reference ?? undefined,

    },
  });

  const search = watch('search');
  const name = watch('name');
  const reference = watch('reference');

  useEffect(() => {
    onChangeFilter({
      search: search,
      name: name,
      reference: reference,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, reference, search]);

  return (
    <Grid container spacing={2} component='form'>
      <Grid item md={3} sm={6} xs={6}>
        <ControlledEnum
          label='Perfil de Referencia'
          name='reference'
          options={user?.role?.reference === ERoleReference.ADMIN ? ERoleReference : ERoleUserReference}
          translate={ERoleReferenceTranslate}
          control={control}
        />
      </Grid>

      {/* { user?.role?.reference === ERoleReference.ADMIN ?
      <Grid item md={3} sm={6} xs={6} >
        <ControlledCompany label='Empresa' name='company'  control={control} />
      </Grid> : null
      } */}

      <Grid item md={user?.role?.reference === ERoleReference.ADMIN ? 6 : 9} sm={6} xs={6}>
        <ControlledDebounce label='Procurar' name='search' control={control} />
      </Grid>
    </Grid>
  );
}
