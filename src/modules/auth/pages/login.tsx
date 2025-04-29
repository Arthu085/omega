import { zodResolver } from '@hookform/resolvers/zod';
import { MailOutline } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


import { formatErrorForNotification } from '@/shared/utils';

import {
  IUnauthenticatedContentAlert,
  UnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import {
  ControlledPassword,
  ControlledText,
  LoadingButton
} from '@shared/components';

import { LoginData, loginSchema } from '../domain';
import { useAuth } from '../hooks';

export function Login() {
  const { login, loading } = useAuth();

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({ message: '', type: 'error' });

  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginData) {
    try {
      await login(data);
    } catch (error) {
      setAlert({
        message: formatErrorForNotification(error),
        type: 'error',
      });
    }
  }

  return (
    <>
      <UnauthenticatedContentHeader title='Bem vindo!' description='Acesse sua conta abaixo.' />

      <Stack component='form' width='100%' gap={3} onSubmit={handleSubmit(handleLogin)}>
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

        <ControlledPassword label='Senha' name='senha' size='medium' control={control} />

        <LoadingButton
          loading={loading}
          loadingIndicator='ENTRANDO...'
          variant='contained'
          type='submit'
          size='large'
        >
          ENTRAR
        </LoadingButton>
      </Stack>

    </>
  );
}
