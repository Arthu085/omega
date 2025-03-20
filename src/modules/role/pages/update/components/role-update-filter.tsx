import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { ControlledEnum, ControlledText } from '@/shared/components';

import { useAuth } from '@/modules/auth/hooks';
import { ERoleReference, ERoleReferenceTranslate, ERoleUserReference } from '@/modules/role/domain';
import { RoleUpdateData } from '@/modules/role/domain/schemas/role-update.schema';

export function RoleUpdateFilter() {
  const { user } = useAuth();

  const { control, watch } = useFormContext<RoleUpdateData>();

  const baseProfile = watch('baseProfile');
  const disabled: boolean = baseProfile! ? true : false;

  return (
    <Grid container spacing={2} component='form'>
      <Grid item md={3} sm={6} xs={6}>
        <ControlledEnum
          label='Perfil de Referencia'
          name='reference'
          options={user?.role?.reference === ERoleReference.ADMIN ? ERoleReference : ERoleUserReference}
          translate={ERoleReferenceTranslate}
          control={control}
          readOnly={disabled}
        />
      </Grid>
      {/* { user?.role?.reference === ERoleReference.ADMIN ?
      <Grid item md={3} sm={6} xs={6} >
        <ControlledCompany label='Empresa' name='company'  control={control} disabled={disabled}/>
      </Grid> : null
      } */}
      <Grid item md={3} sm={6} xs={6}>
        <ControlledText label='Nome do Perfil' name='name' control={control} disabled={disabled} />
      </Grid>
    </Grid>
  );
}
