import { useState } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { EUnauthenticatedPath } from '@/core/router';
import { formatErrorForNotification } from '@/shared/utils';
import { LoadingButton, ControlledPassword } from '@shared/components';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import { ResetData, resetSchema } from '../domain';
import { useAuth } from '../hooks';

export function Reset() {
  const { reset, loading } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    navigate(EUnauthenticatedPath.LOGIN);
  }

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({ message: '', type: 'error' });

  const { control, handleSubmit } = useForm<ResetData>({
    defaultValues: {
      token: token as string,
      password: '',
      confirm: '',
    },
    resolver: zodResolver(resetSchema),
  });

  async function handleReset(data: ResetData) {
    try {
      const response = await reset(data);

      setAlert({
        message: response,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        message: formatErrorForNotification(error),
        type: 'error',
      });
    }
  }

  return (
    <>
      <UnauthenticatedContentHeader
        title='Recuperação de Senha'
        description='Informe uma nova senha para sua conta e confirme-a.'
      />

      <Stack component='form' width='100%' gap={3} onSubmit={handleSubmit(handleReset)}>
        <UnauthenticatedContentAlert
          alert={alert}
          clear={() => {
            setAlert({ message: '', type: 'error' });
          }}
        />

        <ControlledPassword label='Nova Senha' name='password' size='medium' control={control} />

        <ControlledPassword
          label='Confirme a Senha'
          name='confirm'
          size='medium'
          control={control}
        />

        <LoadingButton
          loading={loading}
          loadingIndicator='ENVIANDO...'
          variant='contained'
          type='submit'
          size='large'
        >
          ENVIAR
        </LoadingButton>
      </Stack>
    </>
  );
}
