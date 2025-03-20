import {
  ControlledPassword,
  ControlledText,
} from '@/shared/components/fields';
import Title from '@/shared/components/title';
import { Grid, Stack, Theme, useMediaQuery } from '@mui/material';
import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import UserAvatar from './user-avatar';
import { ControlledDate } from '@/shared/components/fields/controlled-date';
import { UserUpdateSelfData } from '@/modules/user/domain/schemas/user-update-self.schema';

interface Props {
  loading: boolean;
}

export default function UserDataForm({ loading }: Props) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { control, setValue, watch } = useFormContext<UserUpdateSelfData>();

  const avatar = watch('avatar');

  function handleUploadAvatar(file: File | null) {
    setValue('avatar', file ?? undefined);
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <Title>Dados Pessoais</Title>
      </Grid>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'center' : 'start'}
        gap={2}
        padding={2}
      >
        <UserAvatar loading={loading} onUpload={handleUploadAvatar} file={avatar ?? null} />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3} sm={6}>
            <ControlledText control={control} name='name' label='Nome Completo' />
          </Grid>

          <Grid item xs={12} lg={3} sm={6}>
            <ControlledText control={control} name='registration' label='Matrícula' />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <ControlledText control={control} name='email' label='E-mail' />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ControlledText
              control={control}
              name='document'
              label='Documento'
              size='small'
              mask={[{ mask: '000.000.000-00' }, { mask: '00.000.000/0000-00' }]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ControlledText
              control={control}
              name='phone'
              label='Telefone'
              size='small'
              placeholder='(__) ____-____'
              mask={[{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ControlledDate control={control} name='dateOfBirth' label='Data de Nascimento' />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ControlledPassword control={control} name='password' label='Senha' />
          </Grid>
        </Grid>
      </Stack>
    </Fragment>
  );
}
