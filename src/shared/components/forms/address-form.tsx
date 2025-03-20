import { Grid } from '@mui/material';
import { FieldValues, useFormContext } from 'react-hook-form';

import { AddressCreateData } from '@/shared/domain';

import { ControlledCity, ControlledPostcode, ControlledState, ControlledText } from '../fields';

interface FormWithAddress extends FieldValues {
  address: AddressCreateData;
}

export function AddressForm() {
  const { control, watch } = useFormContext<FormWithAddress>();

  const state: string | undefined = watch('address.state');

  return (
    <Grid container spacing={2} marginY={2}>
      <Grid item md={12} sm={6} xs={12}>
        <ControlledPostcode control={control} name='address.postcode' label='CEP*' size='small' />
      </Grid>

      <Grid item md={6} sm={3} xs={6}>
        <ControlledState control={control} name='address.state' label='Estado*' size='small' />
      </Grid>

      <Grid item md={6} sm={3} xs={6}>
        <ControlledCity
          control={control}
          state={state}
          name='address.city'
          label='Cidade*'
          size='small'
        />
      </Grid>

      <Grid item md={6} sm={3} xs={6}>
        <ControlledText label='Número' name='address.number' size='small' control={control} />
      </Grid>

      <Grid item md={6} sm={3} xs={6}>
        <ControlledText
          label='Bairro*'
          name='address.neighborhood'
          size='small'
          control={control}
        />
      </Grid>

      <Grid item sm={6} xs={12} md={12}>
        <ControlledText label='Logradouro*' name='address.street' size='small' control={control} />
      </Grid>

      <Grid item xs={12}>
        <ControlledText
          label='Complemento'
          name='address.complement'
          size='small'
          control={control}
        />
      </Grid>
    </Grid>
  );
}
