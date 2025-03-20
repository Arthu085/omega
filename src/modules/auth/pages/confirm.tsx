import { useState } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { EUnauthenticatedPath } from '@/core/router';
import { formatErrorForNotification } from '@/shared/utils';
import { LoadingButton } from '@shared/components';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import { useAuth } from '../hooks';
import { ConfirmData, confirmSchema } from '../domain/schemas/confirm.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function Confirm() {
  const { confirm, loading } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    navigate(EUnauthenticatedPath.LOGIN);
  }

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({ message: '', type: 'error' });

  const { handleSubmit } = useForm<ConfirmData>({
    defaultValues: {
      token: token as string,
    },
    resolver: zodResolver(confirmSchema),
  });

  async function handleConfirm(data: ConfirmData) {
    try {
      const response = await confirm(data);

      setAlert({
        message: response,
        type: 'success',
      });

      setTimeout(() => {
        navigate(EUnauthenticatedPath.LOGIN);
      }, 15000)
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
        title='Confirmação de E-mail'
        description='Para confirmar seu cadastro, clique no botão abaixo e aguarde a aprovação de um Administrador'
      />

      <Stack component='form' width='100%' gap={3} onSubmit={handleSubmit(handleConfirm)}>
        <UnauthenticatedContentAlert
          alert={alert}
          clear={() => {
            setAlert({ message: '', type: 'error' });
          }}
        />

        <LoadingButton
          loading={loading}
          loadingIndicator='ENVIANDO...'
          variant='contained'
          type='submit'
          size='large'
        >
          CONFIRMAR
        </LoadingButton>
      </Stack>
    </>
  );
}
