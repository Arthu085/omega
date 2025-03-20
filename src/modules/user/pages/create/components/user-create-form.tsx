import { Divider, Grid, Typography } from '@mui/material';
import { ControlledPassword, ControlledText } from '@/shared/components';
import { useFormContext } from 'react-hook-form';
import { UserCreateData } from '@/modules/user/domain';

export function UserForm() {
  const { control } = useFormContext<UserCreateData>();

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12} marginTop={6}>
        <Typography component='h2' variant='h5' fontWeight='bold'>
          Dados de Acesso
        </Typography>
        <Divider orientation='horizontal' variant='middle' flexItem />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <ControlledText label='Nome' name='name' control={control} />
      </Grid>

      <Grid item md={3} sm={6} xs={12}>
        <ControlledText label='Nome de Exibição' name='username' control={control} />
      </Grid>

      <Grid item md={3} sm={6} xs={12}>
        <ControlledText label='Matrícula' name='registration' control={control} />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <ControlledText control={control} name='email' label='E-mail' />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <ControlledPassword control={control} name='password' label='Senha' />
      </Grid>
    </Grid>
  );
}
