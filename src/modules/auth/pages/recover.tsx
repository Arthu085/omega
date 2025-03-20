import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as LinkRouter } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { MailOutline } from '@mui/icons-material';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils';
import { LoadingButton, ControlledText } from '@shared/components';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import { RecoverData, recoverSchema } from '../domain';
import { useAuth } from '../hooks';
import { EUnauthenticatedPath } from '@/core/router';

export function Recover() {
  const { recover, loading } = useAuth();

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({ message: '', type: 'error' });

  const { control, handleSubmit } = useForm<RecoverData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(recoverSchema),
  });

  async function handleRecover(data: RecoverData) {
    try {
      const response = await recover(data);

      setAlert({
        message: formatErrorForNotification(response),
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
        title='Esqueceu a senha?'
        description='Por favor, informe o endereço de e-mail da sua conta que enviaremos um e-mail com o link para o cadastro de uma nova senha.'
      />

      <Stack component='form' width='100%' gap={3} onSubmit={handleSubmit(handleRecover)}>
        <UnauthenticatedContentAlert
          alert={alert}
          clear={() => {
            setAlert({ message: '', type: 'error' });
          }}
        />

        <ControlledText
          label='E-mail'
          name='email'
          size='medium'
          placeholder='exemplo@email.com'
          control={control}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton edge='end' color='inherit'>
                  <MailOutline />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        <Link color='text.secondary' component={LinkRouter} to={EUnauthenticatedPath.LOGIN}>
          Acessar
        </Link>
      </Stack>
    </>
  );
}
