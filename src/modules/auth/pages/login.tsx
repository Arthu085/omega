import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MailOutline } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as LinkRouter } from 'react-router-dom';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';

import { formatErrorForNotification } from '@/shared/utils';

import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import {
  LoadingButton,
  ControlledCheckbox,
  ControlledPassword,
  ControlledText,
} from '@shared/components';

import { LoginData, loginSchema } from '../domain';
import { useAuth } from '../hooks';

export function Login() {
  const { login, loading } = useAuth();

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({ message: '', type: 'error' });

  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
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

        <ControlledPassword label='Senha' name='password' size='medium' control={control} />

        <ControlledCheckbox label='Lembrar-me' name='remember' control={control} />

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

      <Link color='text.secondary' component={LinkRouter} to={EUnauthenticatedPath.RECOVER}>
        Esqueceu a senha?
      </Link>
    </>
  );
}
