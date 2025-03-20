import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledPassword, ControlledText } from '@/shared/components';
import { SignUpData } from '@/modules/auth/domain';

export function SignUpForm() {
  const { control } = useFormContext<SignUpData>();

  return (
    <Grid container spacing={2} marginY={2}>
      <Grid item sm={6} xs={12} md={12}>
        <ControlledText label='Razão Social*' name='companyName' size='small' control={control} />
      </Grid>

      <Grid item sm={6} xs={12} md={12}>
        <ControlledText label='Nome Fantasia' name='tradeName' size='small' control={control} />
      </Grid>

      <Grid item sm={6} xs={6} md={6}>
        <ControlledText
          label='CNPJ*'
          name='cnpj'
          size='small'
          control={control}
          mask='00.000.000/0000-00'
          placeholder='__.___.___/____-__'
        />
      </Grid>

      <Grid item sm={6} xs={6} md={6}>
        <ControlledText
          label='Telefone*'
          name='phone'
          size='small'
          control={control}
          placeholder='(__) ____-____'
          mask={[{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]}
        />
      </Grid>

      <Grid item sm={6} xs={12} md={12}>
        <ControlledText label='E-mail*' name='email' size='small' control={control} />
      </Grid>

      <Grid item sm={6} xs={6} md={6}>
        <ControlledPassword label='Senha*' name='password' control={control} />
      </Grid>

      <Grid item sm={6} xs={6} md={6}>
        <ControlledPassword label='Confirme a Senha*' name='confirm' control={control} />
      </Grid>
    </Grid>
  );
}
